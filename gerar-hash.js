const bcrypt = require('bcryptjs');

// A senha que você quer usar para o login
const senhaPura = 'admin'; 

// O "salt" adiciona uma camada extra de segurança
const salt = bcrypt.genSaltSync(10); 
const hash = bcrypt.hashSync(senhaPura, salt);

console.log(`Senha em texto puro: ${senhaPura}`);
console.log("============================================================");
console.log("SEU HASH PARA COLOCAR NO BANCO DE DADOS É:");
console.log(hash);
console.log("============================================================");