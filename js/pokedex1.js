'use strict';
$('#getPokemons').click(function(){
			var table = document.createElement('table');
//			table.className = "table table-condensed";
//			table.setAttribute("id", "ajaxTable");
			
			
			
			var header = document.createElement('tr');
			header.innerHTML = '<th> Name </th><th> Image </th><th> HP </th>';
//			header.setAttribute("id", "tableHeader");
			table.appendChild(header);
			
	for(var i = 1; i <= 10; i++){
	$.ajax({
		type: "GET",
		url: "http://pokeapi.co/api/v2/pokemon/"+i+"/",
		dataType: 'json',
		success: function(response){
			var name = response.forms[0].name;
			var imgUrl = response.sprites.front_default;
			var hpName = response.stats[5].stat.name ; 
			var hpVal= response.stats[5].base_stat;
			
			var row = document.createElement('tr');
			row.innerHTML = '<td>' + name + '</td>' + '<td>' + '<img src ="'+imgUrl+'"/>' + '</td>' + '<td>' + hpVal + '</td>';
			table.append(row);
			
		}
	});
}

$('#screen').append(table);
});