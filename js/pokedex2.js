'use strict';
$('#searchPokemon').click(function(){
		$.ajax({
				type: "GET",
				url: "",
				dataType: 'json',
				success: function(response){
					var divTable = document.createElement('div');
					divTable.setAttribute('id', 'tableContainer');
					
					var table = document.createElement('table');
					table.className = "table table-condensed";
					table.setAttribute("id", "ajaxSecondTable");
					
					var header = document.createElement('tr');
					header.innerHTML = '<th> Speed</th> <th> Attack</th> <th>Defence stats </th>';
					header.setAttribute("id", "secondTableHeader");
					table.appendChild(header);
					
					response.forEach(function(data) {
						var row = document.createElement('tr');
						row.innerHTML = ;
						table.append(row);
					});
					
					divTable.appendChild(table);
					$('#whiteCircle2').append(divTable);
				}
			});
});

