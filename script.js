$( document ).ready(function() {
    console.log( "ready!" );

    $('#btnLimpiar').on('click', function(){
    	$('#articulos').empty();
    	$('#familias').empty();
    });

    (function() {
			  //var myAPI = "/diegoalarcon/assets/jsonAnuncios.json";
			  var APIAnuncios = "http://diee.github.io/diegoalarcon/assets/jsonAnuncios.json";
			  $.getJSON( APIAnuncios, {
			    format: "json"
			  })
			     .done(function( data ) {
			    	var responseData = data.response.anuncios;
			  
			    	$.each(responseData, function(i, anuncio){
			    		$( "<img>" ).attr( "src", anuncio.imgURL ).attr("height", "40").appendTo( "#anuncios" );
			    	});
			    });
			})();

	(function() {
			  //var myAPI = "/diegoalarcon/assets/jsonRubros.json";
			  var APIRubros = "http://diee.github.io/diegoalarcon/assets/jsonRubros.json";
			  $.getJSON( APIRubros, {
			    format: "json"
			  })
			     .done(function( data ) {
			    	var responseData = data.response;
			  
			    	$.each(responseData, function(i, rubro){
			    		/*$( "<img>" ).attr( "src", rubro.imagen ).attr("height", "80").appendTo( "#rubros" ).on('click', function() {
			    			alert(rubro.id + " / " + rubro.descripcion);
			    		});*/
			    		$( "<img>" ).attr( "src", rubro.imagen ).attr("height", "80").appendTo( "#rubros").on('click', function(){
			    			callFamilias(rubro.codigo_distribuidor);
			    		});
			    	});
			    });
			})();

	function callFamilias(idRubro){

		var APIFamilias = "http://diee.github.io/diegoalarcon/assets/jsonFamilias.json";

		$.getJSON( APIFamilias, {
			    format: "json"
			  })
			     .done(function( data ) {
			    	var responseData = data.response;
			    	console.log("Familias response: ")
			    	console.log(responseData);
			    	var familiasFiltradas = [];

			    	responseData.filter(function (el) {
			    		if(el.id_rubro == idRubro){
			    			familiasFiltradas.push(el);
			    		}
					});

			  		$('#familias').empty();
			    	$.each(familiasFiltradas, function(i, familia){
			    		$( "<img>" ).attr( "src", familia.imagen ).attr("height", "80").appendTo( "#familias").on('click', function(){
			    			callArticulos(familia.codigo_distribuidor);
			    		});
			    	});
			    });
	}

	function callArticulos(idFamilia){

		var APIArticulos = "http://diee.github.io/diegoalarcon/assets/jsonArticulos.json";

		$.getJSON( APIArticulos, {
			    format: "json"
			  })
			     .done(function( data ) {
			    	var responseDataArticulos = data.response.articulos;
			    	var articulosFiltrados = [];

			    	
			    	console.log(idFamilia);
			    	responseDataArticulos.filter(function (el) {
			    		console.log(el.id_familia);
			    		if(el.id_familia == idFamilia){
			    			articulosFiltrados.push(el);
			    		}
					});
					console.log(articulosFiltrados);

			  		$('#articulos').empty();
			    	$.each(articulosFiltrados, function(i, articulo){
			    		$( "<img>" ).attr( "src", articulo.imagen ).attr("height", "80").appendTo( "#articulos").on('click', function(){
			    			//callFamilia(rubro.id);
			    		});
			    	});
			    });
	}


});
