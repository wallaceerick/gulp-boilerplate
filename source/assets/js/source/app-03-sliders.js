var Sliders = {

	init: function(){
		this.slider();
	},

	// Método para iniciar o slider
	// depende do arquivo plugins/slick-slider.js
	slider: function(){

		var element = $('.js-slider');

		// Verifica se existe algum slider na página
		if(element.length > 0){

			element.slick({
				dots:           true,
				infinite:       true,
                prevArrow:      '<svg class="slick-prev"><use xlink:href="assets/images/svg.svg#left"></svg>',
                nextArrow:      '<svg class="slick-next"><use xlink:href="assets/images/svg.svg#right"></svg>',
			});

		}

	}

};

Sliders.init();
