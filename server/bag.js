Bag = new Meteor.Collection('bags');

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
});