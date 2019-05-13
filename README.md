# CoTalker-Pro

> Single page web chart. This shows active sessions in time. Gathers data from "www.mocky.io", simulating an API REST consulting a db made in mongo. Different filters are just different queries to the database, the real logic is made by Vue.js.

### Build Setup

``` bash
# install vue-cli
$ npm install -g vue-cli

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

```

### Active sessions algorithm

The logic that works directly with the data from the db and turns it into "manageable data" is in "Algoritmo_sesiones_activas.js". It doesn't explicitly uses moment.js functions, there's a function where this behaviour should be done. 