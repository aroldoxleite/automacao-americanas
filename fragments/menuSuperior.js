
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

    solicitaNovoCadastro(){
        I.click('ou cadastre-se');
        I.waitForText('Cliente novo? Cadastrar',10);
        I.click('Cliente novo? Cadastrar');
    },

    verificaUsuarioLogado(primeiroNome){
        I.see(primeiroNome, '.usr-nick');
    },

    irParaHome(){
        I.click('#brd-link');
        I.waitUrlEquals('https://www.americanas.com.br/',10);
    },

    buscaProduto(consulta){
        I.fillField('#h_search-input', consulta);
        I.click('.src-btn');
    }


}
