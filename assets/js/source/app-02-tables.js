var Tables = {

	init: function(){
		this.fixedHeader();
		this.tableSorter();
	},

	// Método para fixar o header das tabelas no topo das páginas
	fixedHeader: function(){

		var tableElement = $('.js-fixed-table-header');

		// Verifica se existe uma tabela na página
		if(tableElement.length > 0){

			// Pega a posição do header
			var headerPosition = tableElement.offset().top;

		 	// Quando o scroll da página for igual a posição do header
		 	// ele recebe uma classe que o deixa fixo.
			window.addEventListener('scroll', function(){

				var scrollTop  = $(window).scrollTop(),
					fixedClass = 'gh-fixed-header';

				if (scrollTop > headerPosition) {
					tableElement.addClass(fixedClass);
				}
				else {
					tableElement.removeClass(fixedClass);
				}

			});

		}

	},

	// Método para iniciar o slider
	// depende do arquivo plugins/table-sorter.js
	tableSorter: function(){

		var tableElement = $('.js-table-sorter');
		tableElement.tablesorter();
		
	}

};

Tables.init();
