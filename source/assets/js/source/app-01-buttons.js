var Buttons = {

	init: function(){
		this.effect();
	},

	// Método para executar a animação do click nos botões
	effect: function(){

		var buttonElement = $('.js-animated-button');

		// Verifica se existe um botão na página
		if(buttonElement.length > 0){

			buttonElement.on('click', function(e){
				//e.preventDefault();

				var self = $(this),
					wave = '.button__effect',
					/* Get the width of button (if different buttons types) */
					btnWidth = self.outerWidth(),
					//btnHeight = self.outerHeight(),
					x = e.offsetX,
					y = e.offsetY;

				self.find(wave).remove();
				self.prepend('<div class="button__effect"></div>');

				$(wave)
					.css({
						'top': y,
						'left': x
					})
					.animate({
						opacity: '0',
						width: btnWidth * 2,
						height: btnWidth * 2
					}, 500, function() {
						self.find(wave).remove();
					});

			});

		}

	}

};

Buttons.init();
