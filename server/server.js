Meteor.publish('pokemons', function () {
      return Pokemons.find({});
});

Meteor.publish('bags', function () {
      return Bag.find({});
});