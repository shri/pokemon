function trainerBattle(user, opponent) {
  //set the two trainers participating in this battle
  this.user = user;
  this.opponent = opponent;

  oppCounter = 0;
  this.userPokemon = Meteor.call('getPokemonInParty')[0];
  this.opponentPokemon = opponent.party[oppCounter];

  while(!user.whiteout() && !opponent.whiteout()) {
    while (userPokemon.status != 'fnt' && opponentPokemon.status != 'fnt')  {
      //prompt user for decision (fight, bag, switch)
      //var userDecision = ['fight', 'bag' or 'switch']
      //enemy trainer selects one move at random, store as opponentMove

      if (userDecision == 'switch') {
        //get the new pokemon selected by the user, store as newPokemon
        normalizeStats(userPokemon); //method located in battleFunctions.js
        userPokemon = newPokemon;
        useMove(opponentPokemon, userPokemon, opponentMove); //method located in battleFunctions.js
      }
      else if (userDecision == 'bag') {
        //get the item selection by the user, store as item
        //check item.js
        item.effect(userPokemon);
        useMove(opponentPokemon, userPokemon, opponentMove);
      }

      else if (userDecision == 'fight') {

        //prompt user to choose an attack

        if (userPokemon.speed >= opponentPokemon.speed)  {
          useMove(userPokemon, opponentPokemon, userMove);
          if (opponentPokemon.status != 'fnt')  {
            useMove(opponentPokemon, userPokemon, opponentMove);
          }
        }

        else {
          useMove(opponentPokemon, userPokemon, opponentMove);
          if (userPokemon.status != 'fnt')  {
            useMove(userPokemon, opponentPokemon, userMove);
          }
        }
      }

    }
    //when a pokemon faints, send out new pokemon
    if (userPokemon.status == 'fnt')  {
      if (!user.whiteout()) {
        //prompt for new pokemon, set to newPokemon
        normalizeStats(userPokemon);
        userPokemon = newPokemon;
      }
    }

    if (opponentPokemon.status == 'fnt')  {
      if (opponent.whiteout()) {
        oppCounter += 1;
        if (oppCounter <= opponent.party.length)  {
          opponentPokemon = opponent.party[oppCounter];
        }
      }
    }
  }

  if (user.whiteout())  {
    user.updateMoney(-user.money/2);
    //console.log("NOOB ALERT");
  }
  //if user wins, gain half of opponent's money
  //assuming that the update money takes in the change as a parameter
  if (opponent.whiteout())  {
    user.updateMoney(opponent.money/2);
  }
}
