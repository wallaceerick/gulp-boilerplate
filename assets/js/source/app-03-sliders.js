var Sliders = {

	init: function(){
		this.slider();
	},

	// Método para iniciar o slider
	// depende do arquivo plugins/slick.js
	slider: function(){

		var sliderElement = $('.js-slider');

		// Verifica se existe algum slider na página
		if(sliderElement.length > 0){

			sliderElement.slick({
				slidesPerRow:   3,
				slidesToScroll: 3,
				dots:           true,
				centerMode:     true,
				infinite:       false,
				variableWidth:  false
			});

		} 

	}

};

Sliders.init();
