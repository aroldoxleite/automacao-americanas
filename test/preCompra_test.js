var dados  = require("../data/dadosEntrada.json");
var Chance = require("chance");

Feature('Compra', {retries: 1});

Before((I) => {
    var geradorDeDados = new Chance();
    dados.usuario.cpf=geradorDeDados.cpf();
    dados.usuario.email=geradorDeDados.email();
    I.amOnPage('https://www.americanas.com.br/');
});

Scenario('Realizar o processo até antes da conclusão de uma compra (Pré Compra)', (I, menuSuperiorFragment, cadastroPage, minhaContaPage, produtoPage, seguroGarantiaPage, cestaPage) => {

    I.say("Cadastrar usuário que realizá a compra");
    menuSuperiorFragment.solicitaNovoCadastro();
    cadastroPage.realizaCadastro(dados.usuario);
    menuSuperiorFragment.verificaUsuarioLogado(dados.usuario.nome.split(' ')[0]);
    minhaContaPage.verificaDadosCadastrados(dados.usuario);
    menuSuperiorFragment.irParaHome();

    I.say("Consultar por produto: " + dados.produto.titulo );
    menuSuperiorFragment.buscaProduto(dados.produto.codigo);
    produtoPage.verificaProduto(dados.produto);

    I.say("Colocar produto na cesta");
    produtoPage.comprar();
    seguroGarantiaPage.verificarSeguroGarantia(dados.produto);
    seguroGarantiaPage.contratarSeguroGarantia();
    cestaPage.verificarDadosCompra(dados.produto);

    I.say("Inserir e validar dados do Frete");
    cestaPage.selecionarFrete(dados.usuario.cep, dados.produto.frete.escolhido);
    cestaPage.verificarValoresComFrete(dados.produto);

});
