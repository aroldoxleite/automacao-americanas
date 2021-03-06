
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

    verificaDadosCadastrados(usuario){
        I.click('.usr-nick');
        I.waitForText('Minha conta',5);
        I.click('Minha conta');
        I.seeCurrentUrlEquals('https://minhaconta.americanas.com.br/#/account/home');
        I.waitForText('você não tem pedidos recentes.', 10,'#mainUiView');
        I.waitForText(usuario.nome, 10, '.adress-name p:nth-child(1)');
        I.see(usuario.endereco, '.adress-name p:nth-child(2)');
        I.see(usuario.numero, '.adress-name p:nth-child(2)');
        I.see(usuario.complemento, '.adress-name p:nth-child(2)');
        I.see(usuario.cep.substring(0,5) + '-'+ usuario.cep.substring(5,8), '.adress-name p:nth-child(3)');
        I.see(usuario.bairro, '.adress-name p:nth-child(3)');
        I.see('ver todos os pedidos', '.btn.btn-default.btn-md');
    }
}
