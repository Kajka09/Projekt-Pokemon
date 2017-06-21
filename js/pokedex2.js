'use strict';
var baseUrl = "http://pokeapi.co";
var api = "api";
var version = "v1";
var resources = {
    "pokedex":"pokedex",
    "pokemon":"pokemon",
    "type":"type",
    "move":"move",
    "ability":"ability",
    "egg":"egg",
    "description":"description",
    "sprite":"sprite",
    "game":"game"
};
var id = "1";
var curPokemon = "";

var loading = [];

function main()
{
    // enableConsole(400);
    populateSelectorFromApi("/api/v1/pokedex/1/");
    
    $("#pokeSearchButton").click(function()
	{
        $("#pokedex2").css("display", "block");
        displayPokemonFromApi($("#pokeSelector").val());
        curPokemon = $("#pokeSelector option:selected").text();
        updateSearchButton();
    });
   
    $("#pokeSelector").change(function()
    {
        updateSearchButton();
    });
}

function makeUrl(objects)
{
    if (typeof objects !== "object")
    {
        var errorMsg = "makeURL only accepts parameters of type 'object', not '" + typeof objects + "'";
        console.log(errorMsg);
        throw errorMsg;
    }
    for (var i = 0; i < objects.length; i++)
    {
        if (typeof objects[i] === "undefined")
        {
            var errorMsg = "One of array elements makeUrl received was undefined.";
            console.log(errorMsg);
            throw errorMsg;
        }
    }
    
    return objects.join("/");
}

function clearPokemon()
{
    $("#name").html("");
    $("#attack").html("");
    $("#defense").html("");
    $("#speed").html("");
    $("#evolutions").html("");
}

function displayPokemon(pkmn)
{
    clearPokemon();
    
    $("#name").text(pkmn.name);
    $("#attack").text(pkmn.attack);
    $("#defense").text(pkmn.defense);
   	$("#speed").text(pkmn.speed);
    
    // NOT POPULATED IN THE API
    //$("#total").text(pkmn.total);
    
    // TODO: make api call
    for (var i = 0; i < pkmn.descriptions.length; i++)
        addDescriptionFromApi(pkmn.descriptions[i].resource_uri);
    // TODO: make api call
    for (var i = 0; i < pkmn.evolutions.length; i++)
        $("#evolutions").append($("<div>").text("To: " + pkmn.evolutions[i].to + " Method: " + pkmn.evolutions[i].method));
	loadingComplete("pokemon");
}

function displayPokemonFromApi(uri)
{
    startLoading("pokemon");
    $.getJSON(baseUrl + uri, function(data){displayPokemon(data);});
}

function addDescription(descrip)
{
    //*
    var games = [];
    var itemText = "";
    for (var i = 0; i < descrip.games.length; i++)
    {
        games.push(descrip.games[i].name);
    }
    itemText += games.join("|");
    itemText += ": ";
    itemText += descrip.description;
    if ($("#descriptions > *").length > 0)
    	$("#descriptions").append($("<hr/>"));
    $("#descriptions").append($("<div>").text(itemText));
    loadingComplete("description");
}

function addDescriptionFromApi(uri)
{
    startLoading("description");
    $.getJSON(baseUrl + uri, function(data){addDescription(data);});
}

function populateSelector(pokedex)
{
    // Sort the pokemon names alphabetically since they come in in no
    // particular order in the API, and there is no number associated
    // with each entry.
    pokedex.pokemon.sort(function(a, b){
        return a.name.localeCompare(b.name);
    });
    
    for (var i = 0; i < pokedex.pokemon.length; i++)
    {
        var opt = $("<option>").attr("value", "/" + pokedex.pokemon[i].resource_uri);
        opt.text(pokedex.pokemon[i].name);
        $("#pokeSelector").append(opt);
    }
    loadingComplete("pokedex");
}

function populateSelectorFromApi(uri)
{
    startLoading("pokedex");
    $.getJSON(baseUrl + uri, function(data){populateSelector(data);});
}

function startLoading(item)
{
    loading.push(item);
    $("#pokeSearchButton").text("Loading...");
    updateSearchButton();
}

function loadingComplete(item)
{
    var i = loading.indexOf(item);
    if (i != -1)
        loading.splice(i, 1);
    if (loading.length === 0)
    {
        $("#pokeSearchButton").text("Select");
    	updateSearchButton();
    }
}

function updateSearchButton()
{
    if (loading.length !== 0
        || $("#pokeSelector option:selected").text() === curPokemon)
    	$("#pokeSearchButton").prop("disabled", true);
    else
    	$("#pokeSearchButton").prop("disabled", false);
}

$(document).ready(main());