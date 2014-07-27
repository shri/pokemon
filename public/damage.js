// pass move used and two pokemon instances

var typemodifiers = {
	"Fire" : {
		"Fire" : .5,
		"Water" : .5,
		"Grass" : 2,
		"Electric" : 1,
		"Ice" : 2,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : .5,
		"Bug" : 2,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : .5 
	},
	"Water" : {
		"Fire" : 2,
		"Water" : .5,
		"Grass" : .5,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : 2,
		"Rock" : 2,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : .5 
	},
	"Grass" : {
		"Fire" : .5,
		"Water" : 2,
		"Grass" : .5,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : .5,
		"Ground" : 2,
		"Rock" : 2,
		"Bug" : .5,
		"Poison" : .5,
		"Ghost" : 1,
		"Dragon" : .5 
	},
	"Electric" : {
		"Fire" : 1,
		"Water" : 2,
		"Grass" : .5,
		"Electric" : .5,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 2,
		"Ground" : 0,
		"Rock" : 1,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : .5 
	},
	"Ice" : {
		"Fire" : 1,
		"Water" : .5,
		"Grass" : 2,
		"Electric" : 1,
		"Ice" : .5,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 2,
		"Ground" : 2,
		"Rock" : 1,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : 2
	},
	"Psychic" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : .5,
		"Normal" : 1,
		"Fighting" : 2,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : 1,
		"Bug" : 1,
		"Poison" : 2,
		"Ghost" : 1,
		"Dragon" : 1
	},
	"Normal" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : .5,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 0,
		"Dragon" : 1
	},
	"Fighting" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 2,
		"Psychic" : .5,
		"Normal" : 2,
		"Fighting" : 1,
		"Flying" : .5,
		"Ground" : 1,
		"Rock" : 2,
		"Bug" : .5,
		"Poison" : .5,
		"Ghost" : 0,
		"Dragon" : 1
	},
	"Flying" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 2,
		"Electric" : .5,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 2,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : .5,
		"Bug" : 2,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : 1
	},
	"Ground" : {
		"Fire" : 2,
		"Water" : 1,
		"Grass" : .5,
		"Electric" : 2,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 0,
		"Ground" : 1,
		"Rock" : .5,
		"Bug" : 2,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : 1
	},
	"Rock" : {
		"Fire" : 2,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 2,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : .5,
		"Flying" : 2,
		"Ground" : .5,
		"Rock" : 1,
		"Bug" : 2,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : 1
	},
	"Bug" : {
		"Fire" : .5,
		"Water" : 1,
		"Grass" : 2,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 2,
		"Normal" : 1,
		"Fighting" : .5,
		"Flying" : .5,
		"Ground" : 1,
		"Rock" : 1,
		"Bug" : 1,
		"Poison" : 2,
		"Ghost" : 1,
		"Dragon" : 1
	},
	"Poison" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 2,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : .5,
		"Rock" : .5,
		"Bug" : 2,
		"Poison" : .5,
		"Ghost" : .5,
		"Dragon" : 1
	},
	"Ghost" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 0,
		"Normal" : 0,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : .1,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 2,
		"Dragon" : 1
	},
	"Dragon" : {
		"Fire" : 1,
		"Water" : 1,
		"Grass" : 1,
		"Electric" : 1,
		"Ice" : 1,
		"Psychic" : 1,
		"Normal" : 1,
		"Fighting" : 1,
		"Flying" : 1,
		"Ground" : 1,
		"Rock" : .1,
		"Bug" : 1,
		"Poison" : 1,
		"Ghost" : 1,
		"Dragon" : 1
	},
}

function calcDamage( offense, defense, move )
{
	var offtype = pokemon.stats[ offense.pokemon ].types.text;
	var deftype = pokemon.stats[ defense.pokemon ].types.text;
	var move = moves[ move ];
	var movetype = move.type.text;

	var A = offense.level;
	if ( movetype == "Water" || movetype == "Grass" || movetype == "Fire" || movetype == "Ice" || movetype == "Electric" || movetype == "Psychic")
	{
		var B = offense.spatck;
		var D = defense.spdef;
	}
	else
	{
		var B = offense.atck;
		var D = defense.def;
	}
	var C = moves.power;
	var X = 1;
	if ( offtype == movetype )
	{
		X = 1.5;
	}
	var Y = typemodifiers[ offtype ][ deftype ];
	var Z = Math.random() * ( 255 - 217 + 1 ) + 217; 
	if ( C != "-" )
	{
		var damage = ( ( 2 * A / 5 + 2 ) * B * C / D / 50 + 2 ) * X * Y * Z / 255;
	}
	else
	{
		return 0;
	}
	return damage;
}