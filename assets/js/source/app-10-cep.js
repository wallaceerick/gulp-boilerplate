var PostalCode = {

	// Método para completar o endereço 
    // baseado no número do CEP.
	getAddress: function(cep){
        
        var input  = $('.js-get-address');

        input.blur(function(){
            $.ajax({
                type: 'GET',
                url: 'https://viacep.com.br/ws/' + cep + '/json/',
                dataType: 'json',
                success: function (address){
                    PostalCode.setAddress(address);
                },
                error: function (){
                    console.fire('Erro ao completar o endereço');
                }
            });
        });

    },
    
    setAddress: function(address){

        var result = $('.js-set-address'); 
        result.val(address.logradouro);

    }

};