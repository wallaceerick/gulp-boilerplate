var Sliders = {

	init: function(){
		this.slider();
	},

	// Método para iniciar o slider
	// depende do arquivo plugins/slick-slider.js
	slider: function(){

		var sliderElement = $('.js-slider');

		// Verifica se existe algum slider na página
		if(sliderElement.length > 0){

			sliderElement.slick({
				dots:           true,
				infinite:       true,
                prevArrow:      '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><svg width="40" height="40"><use xlink:href="#left"></svg></button>',
                nextArrow:      '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><svg width="40" height="40"><use xlink:href="#right"></svg></button>',
			});

		}

	}

};

Sliders.init();
