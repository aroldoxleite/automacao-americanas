var Chance = require("chance");
var geradorDeDados = new Chance();

var dados = {
    usuario: {
        nome: "João da Silva",
        cpf: geradorDeDados.cpf(),
        email: geradorDeDados.email(),
        senha: "123456",
        sexo: "Masculino",
        dataNascimento: "1984-12-27",
        tel: "3433333231",
        cel: "34988776655",
        cep: "38410580",
        endereco: "Rua Passo Fundo",
        bairro: "Granada",
        cidade: "Uberlândia",
        estado: "MG",
        numero: "1000",
        complemento: "Ap. 202",
        referencia: "Prédio azul"
    },
    produto: {
        codigo: "132254862",
        titulo: "Iphone Se Space Gray 32gb-bra",
        nome: "iPhone SE 32GB Cinza Espacial IOS 4G Câmera 12MP - Apple",
        valorUnitario:"1.799,99",
        valorTotal:"1.799,99",
        valorTotalItemSeguroFrete:"2.283,18",
        parcelas: "10x de R$ 179,99",
        seguro: "1 ano de Seguro Roubo e Furto por: 10x de R$ 46,62 s/ juros",
        garantia01: "+ 12 meses de Garantia Estendida por: 10x de R$ 23,40 s/ juros",
        garantia02: "+ 24 meses de Garantia Estendida por: 10x de R$ 34,20 s/ juros",
        totalServicos: "808,20",
        frete: {
            escolhido: "FAST",
            rapido: {
                valor: "16,99",
                dias: "5"
            },
            economico: {
                valor: "6,99",
                dias: "7"
            }
        }
    }
};


Feature('Pré Compra');

Scenario('Cadastrar usuário com sucesso', (I) => {
    I.amOnPage('https://www.americanas.com.br/');
    I.click('ou cadastre-se');
    I.waitForText('Cliente novo? Cadastrar',10);
    I.click('Cliente novo? Cadastrar');
    I.waitForText('dados cadastrais');
    I.fillField('email', dados.usuario.email);
    I.fillField('password', dados.usuario.senha);
    I.fillField('password_repeat', dados.usuario.senha);
    I.fillField('name', dados.usuario.nome);
    I.click('label[for="gender_male"]');
    I.fillField('cpf', dados.usuario.cpf);

    I.executeScript(function(data) {
        input = document.querySelector("[name=birthday]");
        input.value = data;
        input.dispatchEvent(new InputEvent("input", {bubbles: true}))
    },dados.usuario.dataNascimento);

    I.fillField('tel', dados.usuario.tel);
    I.fillField('cel', dados.usuario.cel);
    I.fillField('cep', dados.usuario.cep);
    I.waitForVisible('input[name=state]',5);
    I.seeInField('address', dados.usuario.endereco);
    I.seeInField('neighborhood',dados.usuario.bairro);
    I.seeInField('city',dados.usuario.cidade);
    I.seeInField('state',dados.usuario.estado);
    I.fillField('number', dados.usuario.numero);
    I.fillField('complement', dados.usuario.complemento);
    I.fillField('reference', dados.usuario.referencia);
    I.click('submit_button');
    I.waitUrlEquals('https://www.americanas.com.br/',10);
    I.see(dados.usuario.nome.split(' ')[0], '.usr-nick');
    I.click('.usr-nick');
    I.waitForText('Minha conta',5);
    I.click('Minha conta');
    I.seeCurrentUrlEquals('https://minhaconta.americanas.com.br/#/account/home');
    I.waitForText('você não tem pedidos recentes.', 10,'#mainUiView');
    I.see(dados.usuario.nome, '.adress-name p:nth-child(1)');
    I.see(dados.usuario.endereco, '.adress-name p:nth-child(2)');
    I.see(dados.usuario.numero, '.adress-name p:nth-child(2)');
    I.see(dados.usuario.complemento, '.adress-name p:nth-child(2)');
    I.see(dados.usuario.cep.substring(0,5) + '-'+ dados.usuario.cep.substring(5,8), '.adress-name p:nth-child(3)');
    I.see(dados.usuario.bairro, '.adress-name p:nth-child(3)');
    I.scrollTo('.btn.btn-default.btn-md');
    I.see('ver todos os pedidos', '.btn.btn-default.btn-md');
    I.click('#brd-link');
    I.waitUrlEquals('https://www.americanas.com.br/',10);
    I.say("Consultar por produto: " + dados.produto.titulo );
    I.fillField('#h_search-input', dados.produto.codigo);
    I.click('.src-btn');
    I.waitForVisible('.card-product-url', 10);
    I.see(dados.produto.nome, '.card-product-name');
    I.see(dados.produto.valorUnitario, '.card-product-prices');
    I.click(dados.produto.nome);
    I.waitForVisible('.card-title',5);
    I.see(dados.produto.nome, '.product-name');
    I.see(dados.produto.valorUnitario, '.sales-price');
    I.say("Realizar compra");
    I.click('Comprar');
    I.waitForText('agora que você já escolheu seu produto, saiba como protegê-lo por mais tempo.',5);
    I.see(dados.produto.titulo, '.card-product--title');
    I.see(dados.produto.seguro, '.roubo_furto-option-0');
    I.see(dados.produto.garantia01, '.garantia_estendida-option-0');
    I.see(dados.produto.garantia02, '.garantia_estendida-option-1');
    I.click('.roubo_furto-option-0');
    I.click('Continuar');
    I.waitForText('minha cesta',5);
    I.see(dados.produto.titulo);
    I.see("R$ " + dados.produto.valorUnitario, ".basket-item-price.hidden-xs.hidden-sm");
    I.see("R$ " + dados.produto.valorTotal, "#basket-item-total-main");
    I.say("Inserir e validar dados do Frete");
    I.fillField('cep', dados.usuario.cep);
    I.click('#calculate-freight-button');
    I.waitForText('Confira abaixo o prazo de entrega e o valor do frete para o CEP ' + dados.usuario.cep.substring(0,5) + '-'+ dados.usuario.cep.substring(5,8),5);
    I.see("R$ " + dados.produto.frete.rapido.valor, 'label[for=FAST]');
    I.see("até " + dados.produto.frete.rapido.dias + " dias úteis", 'label[for=FAST]');
    I.see("R$ " + dados.produto.frete.economico.valor, 'label[for=CONVENTIONAL]');
    I.see("até " + dados.produto.frete.economico.dias + " dias úteis", 'label[for=CONVENTIONAL]');
    I.click('label[for='+dados.produto.frete.escolhido+']');
    I.see(dados.produto.frete.rapido.dias + " dias úteis", ".basket-item-freight.freight-full.animate-fade");
    I.see(dados.produto.valorTotalItemSeguroFrete, '#total-amount');
});