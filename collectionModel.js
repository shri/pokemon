Pokemons = new Meteor.Collection('pokemons');
Bag = new Meteor.Collection('bags');

Pokemons.allow({
  insert: function (userId, pokemon, fields, modifier) {
      return true;
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

Bag.allow({
  insert: function (userId, pokemon, fields, modifier) {
      return false;
  },
  update: function (userId, pokemon, fields, modifier) {
      return false;
  },
  remove: function (userId, pokemon) {
    return false;
  }
});

Meteor.methods({
    catchPokemon: function(pokemon) {
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in");
        if (pokemon.pokemon < 1 || pokemon.pokemon > 151 )
            throw new Meteor.Error(400, "Unsupported Pokemon");
        if (! this.userId )
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
            HP: pokemon.HP,
            remainingHP:pokemon.remainingHP,
            exp: pokemon.exp,
            status: pokemon.status,
            position: pokemon.position
        });
    },
    healPokemon: function(pokemon) {
//        if (pokemon.trainer != this.userId)
//            throw new Meteor.Error(400, "You can only heal your own pokemons");
        return Pokemons.update({ _id: pokemon._id }, { $set: { "remainingHP": pokemon.HP }});
    },
    releasePokemon: function(pokemon) {
//        if (pokemon.trainer !== this.userId)
//            throw new Meteor.Error(400, "You can only release your own pokmeon");
        return Pokemons.remove({ _id: pokemon._id });
        
    },
    addMoveToPokemon: function(pokemon, move) {
//        if (pokemon.moves >= 4)
//            throw new Meteor.Error(400, "Pokemon has max number of moves");
        return Pokemons.update({ _id: pokemon._id }, { $addToSet: { moves: move } });
    },
    removeMoveFromPokemon: function(pokemon, move) {
        return Pokemons.update({ _id: pokemon._id }, { $pull : { moves: move } });
    },
    updatePokemonStatus: function(pokemon, status) {
        return Pokemons.update({ _id: pokemon._id }, { $set : { status: status } });
    },
    getPokemonInParty: function(user) {
        return Pokemons.find({trainer: this.userId});
    },
    getPokemonInBox: function() {
        return Pokemons.find({trainer: this.userId, position: 0});
    }
});