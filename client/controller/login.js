Template.home.greeting = function () {
    return "Welcome to Pokemon!";
};

Template.modalInner.events({
    'click .pokemon': function (event) {
        $(event.target).siblings().removeClass("active"); 
    }
});

Meteor.subscribe("pokemons");
