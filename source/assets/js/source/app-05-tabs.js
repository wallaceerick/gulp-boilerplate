var Tabs = {

	init: function(){
		this.tabs();
	},

	// Método para iniciar as abas
	// depende do arquivo plugins/tabslet.js
	tabs: function(){

		var tabElement = $('.js-tabs');

		console.beer('Drunk...');

		// Verifica se existe um botão na página
		if(tabElement.length > 0){

			tabElement.tabslet({
				animation: true,
				container: '.js-tabs-content'
			});

			tabElement.on('_after', function() {
				console.log('Evento');
			});

		}

	}

};

Tabs.init();
