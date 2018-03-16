var Masks = {
	init: function(){
		this.cep();
	},

	// Method to init input masks
	// dependence of plugins/mask.js
	cep: function(){

		var element = $('.js-mask-cep');

		// Verify if element exists.
		if(element.length > 0){
			element.mask('00000-000', {
				onComplete: function(cep) {
					PostalCode.getAddress(cep);
				}, 
				onInvalid: function(val, e, f, invalid, options){
					var error = invalid[0];
					console.fire(val, e, f, invalid, options); 
					console.fire('A letra ', error.v, ' não é permitido.');
				}
			});






			
        }

	}

};

Masks.init();
