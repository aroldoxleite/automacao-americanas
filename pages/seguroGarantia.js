
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

    verificarSeguroGarantia(produto){
        I.waitForText('agora que você já escolheu seu produto, saiba como protegê-lo por mais tempo.',5);
        I.see(produto.titulo, '.card-product--title');
        I.see(produto.seguro, '.roubo_furto-option-0');
        I.see(produto.garantia01, '.garantia_estendida-option-0');
        I.see(produto.garantia02, '.garantia_estendida-option-1');
    },

    contratarSeguroGarantia(){
        I.click('.roubo_furto-option-0');
        I.click('Continuar');
    },


}
