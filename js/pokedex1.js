'use strict';
$('#getPokemons').click(function(){

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
				$('#pokemonTable').append(row);
			}
		});
	}    
	$('#pokemonTable').show();
	  $('#pokemonTable').DataTable(
       { "lengthMenu": [[5, 10, -1], [5, 10, "All"]] });
});
function rotateImage(event) {
	$(event.target).css('transform', 'rotate(' + 360 + 'deg)');
	$(event.target).css('transition-duration', '2s');
}
function reRotateImage(event) {
	$(event.target).css('transform', 'rotate(' + 0 + 'deg)');
}