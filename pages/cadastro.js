
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

    realizaCadastro(usuario){

        I.waitForText('dados cadastrais');
        I.fillField('email', usuario.email);
        I.fillField('password', usuario.senha);
        I.fillField('password_repeat', usuario.senha);
        I.fillField('name', usuario.nome);
        I.click('label[for="gender_male"]');
        I.fillField('cpf', usuario.cpf);

        I.executeScript(function(data) {
            input = document.querySelector("[name=birthday]");
            input.value = data;
            input.dispatchEvent(new InputEvent("input", {bubbles: true}))
        },usuario.dataNascimento);

        I.fillField('tel', usuario.tel);
        I.fillField('cel', usuario.cel);
        I.fillField('cep', usuario.cep);
        I.waitForVisible('input[name=state]',5);
        I.seeInField('address', usuario.endereco);
        I.seeInField('neighborhood',usuario.bairro);
        I.seeInField('city',usuario.cidade);
        I.seeInField('state',usuario.estado);
        I.fillField('number', usuario.numero);
        I.fillField('complement', usuario.complemento);
        I.fillField('reference', usuario.referencia);
        I.click('submit_button');
        I.waitUrlEquals('https://www.americanas.com.br/',10);
    }
}
