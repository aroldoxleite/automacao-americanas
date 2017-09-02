Feature('Pré Compra');

Scenario('Informar dados cadastrais', (I) => {
    I.amOnPage('https://www.americanas.com.br/');
    I.click('ou cadastre-se');
    I.waitForText('Cliente novo? Cadastrar',5);
    I.click('Cliente novo? Cadastrar');
    I.waitForText('dados cadastrais');
    I.fillField('email', 'teste@teste');
    I.fillField('password', '123456');
    I.fillField('password_repeat', '123456');
    I.fillField('name', '123456');
    I.click('label[for="gender_male"]');
    I.fillField('cpf', '06031881683');
    I.executeScript(function() {
        document.getElementsByName('birthday')[0].value = '1984-12-27';
        document.getElementsByName('birthday').onchange = function() {
            console.log(this.value);
        }
    });
    I.pressKey('Enter');
    I.fillField('tel', '3432321010');
    I.fillField('cel', '34999998888');
    I.fillField('cep', '38410580');
    I.waitForVisible('input[name=state]',3);
    I.seeInField('address', 'Rua Passo Fundo');
    I.seeInField('neighborhood','Granada');
    I.seeInField('city','Uberlândia');
    I.seeInField('state','MG');
    I.fillField('number', '3333333');
    I.fillField('complement', 'Número 2380');
    I.fillField('reference', 'Casa Azul');






    pause();
});
