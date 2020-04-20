<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
<h3 align="center">
  Aplicação para uma transportadora fictícia
</h3>
</h1>

---

## Descrição:

Esse repositório é referente ao aplicativo mobile do FastFeet desenvolvido em react-native.

---

<div align="center">
  <img alt="FastfeetMobile" title="FastfeetMobile" src="https://github.com/IVBC/fastFeet/blob/master/screenshot/mobile.jpg?raw=true" />
</div>

---

## Como executar o projeto
- O aplicativo foi feito para dispositivos android.
- É necessário que o [servidor](https://github.com/IVBC/fastFeet/tree/master/backend) esteja rodando na porta 3333.

Clone o repositorio:

> \$ git clone https://github.com/IVBC/fastFeet.git

Acesse a pasta:

> \$ cd fastFeet/mobile

- É necessário ter yarn instalado.

Instale as dependências:

> \$ yarn

- É necessário um emulador android, e que as portas 3333, 9090 e 8081 estajam expostas, caso necessário execute:

  > adb reverse tcp:8081 tcp:8081

  > adb reverse tcp:3333 tcp:3333

  > adb reverse tcp:9090 tcp:9090

Execute:

> \$ react-native run-android

Em seguida execute:

> \$ yarn start

---
