Template.home.greeting = function () {
    return "";
};

Template.modalInner.events({
    'click .pokemon': function (event) {
        $(event.target).siblings().removeClass("active"); 
    }
});

Meteor.subscribe("pokemons");
