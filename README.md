# automacao-americanas

## Objetivo

---

## Ferramentas Utilizadas

- [NodeJS](http://nodejs.org/)
- [CodeceptJS](http://codecept.io/)
- [Selenium](http://www.seleniumhq.org/)

---

## Execução
Após clone do projeto:
```shell
cd automacao-americanas
```

Instale as dependências:
```shell
npm install

[sudo] npm install -g selenium-standalone
[sudo] selenium-standalone install
selenium-standalone start
```

Execute o teste:
```shell
./node_modules/.bin/codeceptjs run --steps
```
