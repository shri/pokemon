Pokemons = new Meteor.Collection('pokemons');

Pokemons.allow({
  insert: function (userId, pokemon, fields, modifier) {
      return false;
  },
  update: function (userId, pokemon, fields, modifier) {
      return true;
  },
  remove: function (userId, pokemon) {
      // Only pokemon trainers can delete their pokemon
      if (userId == pokemon.trainer) {
          return true;
      }
    return false;
  }

});

Meteor.methods({
    catchPokemon: function(pokemon) {
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in");
        if (pokemon.pokemon < 1 || pokemon.pokemon > 151 )
            throw new Meteor.Error(400, "Unsupported Pokemon");
        if (! pokemon.trainer )
            throw new Meteor.Error(400, "You must specify a pokemon trainer");
        if (!(pokemon.level > 0 && pokemon.level <= 100))
            throw new Meteor.Error(400, "Pokemon level must range between 1-100");
        if (!pokemon.attack || !pokemon.spattack || !pokemon.defense || !pokemon.spdefense)
            throw new Meteor.Error(400, "Pokemon must have all stats");
        if (!pokemon.HP || !pokemon.remainingHP)
            throw new Meteor.Error(400, "Pokemon must have HP");
        if (!pokemon.exp)
            throw new Meteor.Error(400, "Pokemon must have exp");

        return Pokemons.insert({
            trainer: this.userId,
            pokemon: pokemon.pokemon,
            level: pokemon.level,
            moves: pokemon.moves,
            attack: pokemon.attack,
            spattack: pokemon.spattack,
            defense: pokemon.defense,
            spdefense: pokemon.spdefense,
            speed: pokemon.speed,

            attackstage: pokemon.attackstage;
            spattackstage: pokemon.spattackstage;
            defensestage: pokemon.defensestage;
            spdefensestage: pokemon.spdefensestage;
            speed: pokemon.speedstage;

            battleattack: pokemon.battleattack,
            battlespackattack: pokemon.battlespattack,
            battledefense: pokemon.battledefense,
            battlespdefense: pokemon.battlespdefense,
            battlespeed: pokemon.battlespeed,

            HP: pokemon.HP,
            remainingHP:pokemon.remainingHP,
            exp: pokemon.exp,
            status: pokemon.status
            catchrate: pokemon.catchrate,
        });
    },
    healPokemon: function(pokemon) {
        if (pokemon.trainer != this.userId)
            throw new Meteor.Error(400, "You can only heal your own pokemons");
        return Pokemons.update({ _id: pokemon._id }, { $set: { "remainingHP": pokemon.HP }});
    },
    releasePokemon: function(pokemon) {
        if (pokemon.trainer == this.userId)
            return Pokemons.remote({ _id: pokemon._id });
    },
    addMoveToPokemon: function(pokemon, move) {
        if (pokemon.moves >= 4)
            throw new Meteor.Error(400, "Pokemon has max number of moves");
        return Pokemons.update({ _id: pokemon._id }, { $addToSet: { moves: move } });
    },
    removeMoveFromPokemon: function(pokemon, move) {
        return Pokemons.update({ _id: pokemon._id }, { $pull : { moves: move } });
    },
    updateBattleStat: function(pokemon, stage, stat)  {
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
        case "attack": pokemon.battleattack = pokemon.battleattack * modifier;
        case "defense": pokemon.update({$set: {battledefense: Math.floor(battledefense * modifier)}});
        case "spattack": pokemon.update({$set: {battlespattack: Math.floor(battlespattack * modifier)}});
        case "spdefense": pokemon.update({$set: {battlespdefense: Math.floor(battlespdefense * modifier)}});
        case "speed": pokemon.update({$set: {battlespeed: Math.floor(battlespeed * modifier)}});
        default: break;
      }
      return pokemon;
    }
    updatePokemonStatus: function(pokemon, status) {
        if (status == "par")  {
          updateBattleStat(pokemon, -6, "speed");
        }
        if (status == "brn")  {
          updateBattleStat(pokemon, -2, "attack");
        }
        return Pokemons.update({ _id: pokemon._id }, { $set : { status: status } });
    }
});
