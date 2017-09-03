
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

    verificarDadosCompra(produto){
        I.waitForText('minha cesta',5);
        I.see(produto.titulo);
        I.see("R$ " + produto.valorUnitario, ".basket-item-price.hidden-xs.hidden-sm");
        I.see("R$ " + produto.valorTotal, "#basket-item-total-main");
    },

    selecionarFrete(cep, escolhido){
        I.fillField('cep', cep);
        I.click('#calculate-freight-button');
        I.waitForText('Confira abaixo o prazo de entrega e o valor do frete para o CEP ' + cep.substring(0,5) + '-'+ cep.substring(5,8),5);
        I.click('label[for='+escolhido+']');
    },

    verificarValoresComFrete(produto){
        I.see("R$ " + produto.frete.rapido.valor, 'label[for=FAST]');
        I.see("até " + produto.frete.rapido.dias + " dias úteis", 'label[for=FAST]');
        I.see("R$ " + produto.frete.economico.valor, 'label[for=CONVENTIONAL]');
        I.see("até " + produto.frete.economico.dias + " dias úteis", 'label[for=CONVENTIONAL]');
        I.see(produto.frete.rapido.dias + " dias úteis", ".basket-item-freight.freight-full.animate-fade");
        I.see(produto.valorTotalItemSeguroFrete, '#total-amount');
    }
}
