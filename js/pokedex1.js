'use strict';
$('#getPokemons').click(function () {
	$.ajax({
		type: "GET",
		url: "http://pokeapi.co/pokemon/",
		dataType: 'json',
		success: function (response) {
			var divTable = document.createElement('div');
			divTable.setAttribute('id', 'tableContainer');
			
			var table = document.createElement('table');
			table.className = "table table-condensed";
			table.setAttribute("id", "ajaxTable");
			
			var header = document.createElement('tr');
			header.innerHTML = '<th> Image </th><th> Name </th><th> HP </th>';
			header.setAttribute("id", "tableHeader");
			table.appendChild(header);
			
			response.forEach(function (data) {
				var row = document.createElement('tr');
				row.innerHTML = '<td>' + data.name+ '</td>';
				table.append(row);
			});
			
			divTable.appendChild(table);
			$('#whiteScreen').append(divTable);
		}
	});
});