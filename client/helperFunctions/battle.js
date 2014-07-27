function trainerBattle(user, opponent) {
  //set the two trainers participating in this battle
  this.user = user;
  this.opponent = opponent;

  oppCounter = 0;
  this.userPokemon = Meteor.call('getPokemonInParty')[0];
  this.opponentPokemon = opponent.party[oppCounter];

  while(!user.whiteout() && !opponent.whiteout()) {
    while (userPokemon.status != 'fnt' && opponentPokemon.status != 'fnt')  {
      //prompt user for decision (fight, bag, switch), using janky pop-ups for now LOOL
      var userDecision = prompt("fight, bag, or switch?");
      if (userDecision != "fight" && userDecision != "bag" && userDecision != "switch") {
        throw new Meteor.Error("You entered " + userDecision + ", which is an invalid choice");
      }

      //var opponentChoice = Math.floor(opponentPokemon.moves.length * Math.random());
      var opponentChoice = 0; //temporary hacky fix
      var opponentMove = opponentPokemon.moves[opponentChoice]; //select one of the opponent's moves at random

      if (userDecision == 'switch') {
        //get the new pokemon selected by the user, store as newPokemon
        var newPokemonInt = prompt("enter a number from 1 to 6");
        userPokemon = user.party[newPokemonInt];

        normalizeStats(userPokemon); //method located in battleFunctions.js
        userPokemon = newPokemon;
        useMove(opponentPokemon, userPokemon, opponentMove); //method located in battleFunctions.js
      }
      else if (userDecision == 'bag') {
        //get the item selection by the user, store as item
        var item = prompt("enter the name of the item you want to use");

        //check item.js
        item.effect(userPokemon);
        useMove(opponentPokemon, userPokemon, opponentMove);
      }

      else if (userDecision == 'fight') {

        var userMove = prompt("type in the name of the move you want to use (capitalize the first letter):");

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

    //levelUp and evolve are located in experience.js
    if (opponentPokemon.status == 'fnt')  {
      gainExperience('trainer', opponentPokemon, userPokemon);
      //notify user of experience gained
      if(userPokemon.level != levelUp(userPokemon)) {
        //notify user of leveling up
        userPokemon.level = levelUp(userPokemon);
      }
      if (userPokemon.Pokemon != evolve(userPokemon)) {
        //notify user of evolving
        userPokemon.Pokemon = evolve(userPokemon);
      }
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
    return 'loss';
  }
  //if user wins, gain half of opponent's money
  //assuming that the update money takes in the change as a parameter
  if (opponent.whiteout())  {
    user.updateMoney(opponent.money/2);
    return 'win';
  }
}



function wildBattle(user, wild) {
  //set the two participating in this battle
  this.user = user;
  this.wild = wild;

  //user.chooseStarter();
  //var tempwild1 = {pokemon:'1', level: 3, moves: ['Tackle', 'Vine Whip'], attack: 45, defense: 45, spattack: 45, spdefense: 45, speed: 45, HP: 45, remainingHP:45, exp: 45, status: 'non', position: 0};

  this.userPokemon = Meteor.call('getPokemonInParty')[0];


  while(!user.whiteout() && wild.status != 'fnt') {
    while (userPokemon.status != 'fnt' && opponentPokemon.status != 'fnt')  {
      //prompt user for decision (fight, bag, switch), using janky pop-ups for now LOOL
      var userDecision = prompt("fight, bag, or switch?");
      if (userDecision != "fight" && userDecision != "bag" && userDecision != "switch") {
        throw new Meteor.Error("You entered " + userDecision + ", which is an invalid choice");
      }

      //var opponentChoice = Math.floor(opponentPokemon.moves.length * Math.random());
      var opponentChoice = 0; //temporary hacky fix
      var opponentMove = wild.moves[opponentChoice]; //select one of the opponent's moves at random

      if (userDecision == 'switch') {
        //get the new pokemon selected by the user, store as newPokemon
        var newPokemonInt = prompt("enter a number from 0 to 5");
        userPokemon = user.party[newPokemonInt];

        normalizeStats(userPokemon); //method located in battleFunctions.js
        userPokemon = newPokemon;
        useMove(wild, userPokemon, opponentMove); //method located in battleFunctions.js
      }
      else if (userDecision == 'bag') {
        //get the item selection by the user, store as item
        var item = prompt("enter the name of the item you want to use");

        //check item.js
        item.effect(userPokemon);
        useMove(wild, userPokemon, opponentMove);
      }

      else if (userDecision == 'fight') {

        var userMove = prompt("type in the name of the move you want to use (capitalize the first letter):");

        if (userPokemon.speed >= wild.speed)  {
          useMove(userPokemon, wild, userMove);
          if (wild.status != 'fnt')  {
            useMove(wild, userPokemon, opponentMove);
          }
        }

        else {
          useMove(wild, userPokemon, opponentMove);
          if (userPokemon.status != 'fnt')  {
            useMove(userPokemon, wild, userMove);
          }
        }
      }

    }
    //when your pokemon faints, send out new pokemon
    if (userPokemon.status == 'fnt')  {
      if (!user.whiteout()) {
        //prompt for new pokemon, set to newPokemon
        normalizeStats(userPokemon);
        userPokemon = newPokemon;
      }
    }

    //levelUp and evolve are located in experience.js
    if (wild.status == 'fnt')  {
      gainExperience('trainer', opponentPokemon, userPokemon);
      //notify user of experience gained
      if(userPokemon.level != levelUp(userPokemon)) {
        //notify user of leveling up
        userPokemon.level = levelUp(userPokemon);
      }
      if (userPokemon.Pokemon != evolve(userPokemon)) {
        //notify user of evolving
        userPokemon.Pokemon = evolve(userPokemon);
      }
      return 'win';
    }
  }

  if (user.whiteout())  {
    //user.updateMoney(-user.money/2);
    //console.log("NOOB ALERT");
    return 'loss';
  }
  // //if user wins, gain half of opponent's money
  // //assuming that the update money takes in the change as a parameter
  // if (opponent.whiteout())  {
  //   user.updateMoney(opponent.money/2);
  //   return user;
  // }
}


function battle(user, opponent)  {
  this.user = user;

  this.party = getPokemonInParty(user);
  this.userpokemon = this.party[0];
  this.wild = opponent;
  this.wildmoves = opponent.moves;
  this.faster = (user.speed >= opponent.speed);
}

battle.prototype.usePokeball = function(balltype) {
  var catch = checkCatch(balltype, opponent);
  var success
  if (catch)  {
    catchPokemon(this.wild);
    //notify user that pokeball succeeded
    endBattle();
  }
  else {
    //notify user that pokeball failed
  }
  //decrement pokeball count
  return catch;
}

battle.prototype.useAttack = function(move)  {
  //useMove(this.userpokemon, this.wild, move);
  if (this.user.speed >= this.wild.speed)  {
    useMove(this.user, this.wild, move);
    getAttacked();
  }
  else {
    getAttacked();
    useMove(this.user, this.wild, move);
  }
}

battle.prototype.runAway = function()  {

}

battle.prototype.getAttacked = function() {
  useMove(this.wild, this.userpokemon, this.wildmoves[0]);
}

battle.prototype.useItem = function(item) {
  effect(this.userpokemon, item);
  getAttacked();
}

battle.prototype.changePokemon = function(next) {
  if (this.party[next] == this.userpokemon)  {
    //throw new Meteor.Error("this pokemon is already in battle");
  }
  else {
    this.userpokemon = this.party[next];
  }
  getAttacked();
}

battle.prototype.getAllPokemonInParty = function()  {
  return this.party;
}

battle.prototype.endBattle = function() {
  if (this.wild.status == 'fnt' || this.user.whiteout())  {
    for (var i = 0; i < this.party.length; i++) {
      var rHP = this.party[i].remainingHP;
      //save stuff to database;
    }
    return true;
  }
  return false;
}
