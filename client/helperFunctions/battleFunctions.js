//applies changes to stats during battle
function updateBattleStat(pokemon, stage, stat)  {
      var modifier;
      switch(stage) {
        case -6: modifier = 1.0/4; break;
        case -5: modifier = 2.0/7; break;
        case -4: modifier = 1.0/3; break;
        case -3: modifier = 2.0/5; break;
        case -2: modifier = 1.0/2; break;
        case -1: modifier = 1.0/3; break;
        case 0: modifier = 1.0; break;
        case 1: modifier = 1.5; break;
        case 2: modifier = 2.0; break;
        case 3: modifier = 2.5; break;
        case 4: modifier = 3.0; break;
        case 5: modifier = 3.5; break;
        case 6: modifier = 4.0; break;
        default: modifier = 1.0; break;
      }
      switch(stat)  {
        case "attack": pokemon.battleattack = pokemon.attack * modifier; break;
        case "defense": pokemon.battledefense = pokemon.defense * modifier; break;
        case "spattack": pokemon.battlespattack = pokemon.spattack * modifier; break;
        case "spdefense": pokemon.battlespdefense = pokemon.spdefense * modifier; break;
        case "speed": pokemon.battlespeed = pokemon.speed * modifier; break;
        default: break;
      }
      return pokemon;
}

//reverts stat changes, for use upon switching or ending the battle
function normalizeStats(pokemon)  {
  pokemon.battleattack = pokemon.attack;
  pokemon.battledefense = pokemon.defense;
  pokemon.battlespattack = pokemon.spattack;
  pokemon.battlespdefense = pokemon.spdefense;
  pokemon.battlespeed = pokemon.speed;
  return pokemon;
}

//carries out a move from an attacker on a defender
//resolves all effects of the move
function useMove(attacker, defender, move) {
  if(checkHit(attacker, defender, move))  {
    var damage = calcDamage(attacker, defender, move);
    defender.remainingHP = Math.min(0, defender.remainingHP - damage);
    if (attacker.status != 'fnt') {
      move.userEffect(attacker);
    }
    if (defender.status != 'fnt') {
      move.targetEffect(defender);
    }
  }
}

//calculates if a move hits or not, depending on the move's conditions and accuracy
//uses move's accuracy as a percentage hit rate, does not follow original game freak algorithms
function checkHit(attacker, defender, move) {
  //if the defender fails the move's hit conditions (such as being airborne from using Fly) then it does not hit
  if (move.hitCondition(defender))  {
    if (100*Math.random() < move.accuracy)  {
      return true;
    }
  }
  return false;
}

//changes the status of a pokemon during battle and applies the appropriate stat changes
function updateStatus(pokemon, status)  {
  if (status != 'psn' && status != 'par' && status != 'slp' && status != 'frz' && status != 'brn' && status != 'non' && status != 'fnt') {
    throw new Meteor.Error("passed invalid status string: " + status + ". status must be par, slp, frz, brn, fnt, or non");
  }
  if (pokemon.status == 'non') {
    pokemon.status = status;
  }
  else if (status = 'fnt')  {
    pokemon.status = 'fnt';
  }
  else if (status = 'non')  {
    if (pokemon.status != 'fnt')  {
      pokemon.status = 'non';
    }
  }
  //apply stat changes for paralysis and burn
  if (pokemon.status == 'par')  {
    updateBattleStat(pokemon, -6, speed);
  }

  if (pokemon.status == 'brn')  {
    updateBattleStat(pokemon, Math.min(pokemon.attackstage - 2, -6), attack)
  }

  return pokemon.status;
}

//method for reviving pokemon during battle, which can only be done via revive or max revive
function revive(pokemon, item)  {
  //block using non-revive items and attempting to revive pokemon that haven't fainted
  if (item != 'revive' && item != 'max revive') {
    throw new Meteor.Error(item " cannot be used to revive. only a revive or a max revive can be used to revive pokemon.");
  }
  if (pokemon.statue != 'fnt')  {
    throw new Meteor.Error("the pokemon " + pokemon " has not fainted. you can only use revive or max revive on a fainted pokemon.");
  }
  //revive the pokemon
  pokemon.status = 'non';
  if (item == 'revive') {
    pokemon.remainingHP = Math.floor(pokemon.HP/2);
  }
  else if (item == 'max revive')  {
    pokemon.remainingHP = pokemon.HP;
  }
  return pokemon;
}
