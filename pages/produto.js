
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  verificaProduto(produto){
      I.waitForVisible('.card-product-url', 10);
      I.see(produto.nome, '.card-product-name');
      I.see(produto.valorUnitario, '.card-product-prices');
      I.click(produto.nome);
      I.waitForVisible('.card-title',5);
      I.see(produto.nome, '.product-name');
      I.see(produto.valorUnitario, '.sales-price');
  },

    comprar(produto){
        I.click('Comprar');
    }



}
