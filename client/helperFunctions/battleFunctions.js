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
        case "attack": pokemon.battleattack *= modifier; break;
        case "defense": pokemon.battledefense *= modifier; break;
        case "spattack": pokemon.battlespattack *= modifier; break;
        case "spdefense": pokemon.battlespdefense *= modifier; break;
        case "speed": pokemon.battlespeed *= modifier; break;
        default: break;
      }
      return pokemon;
    }
