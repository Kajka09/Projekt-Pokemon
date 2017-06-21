'use strict';
$('#getPokemons').click(function(){
	var table = document.createElement('table');
	table.className = "table table-condensed";
	table.setAttribute("id", "ajaxTable");

	var header = document.createElement('tr');
	header.innerHTML = '<th> Name </th><th> Image </th><th> HP </th>';
	header.setAttribute("id", "tableHeader");
	table.appendChild(header);

	var random = Math.floor(Math.random()*100);
	for(var i = random ; i <= random + 10; i++){
		$.ajax({
			type: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/"+i+"/",
			dataType: 'json',
			success: function(response){
				var name = response.forms[0].name;
				var imgUrl = response.sprites.front_default;
				var hpName = response.stats[5].stat.name ; 
				var hpVal= response.stats[5].base_stat;

				var row = document.createElement('tr');
				row.innerHTML = '<td>' + name + '</td>' + '<td>' + '<img id="pokeImage" src ="'+imgUrl+'" />' + '</td>' + '<td>' + hpVal + '</td>';
				$(document).on("mouseover", "#pokeImage", rotateImage);
				$(document).on("mouseout", "#pokeImage", reRotateImage);
				$('#pokedex1').append(row);
			}
		});
	}    
	$('#pokedex1').append(table);
});
function rotateImage(event) {
	$(event.target).css('transform', 'rotate(' + 1000 + 'deg)');
}
function reRotateImage(event) {
	$(event.target).css('transform', 'rotate(' + 0 + 'deg)');
}