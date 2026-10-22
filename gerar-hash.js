// Gera o hash bcrypt de uma senha para inserir manualmente no banco.
// Uso: node gerar-hash.js "minha-senha-forte"
const bcrypt = require('bcryptjs');

const senhaPura = process.argv[2];

if (!senhaPura) {
  console.error('Uso: node gerar-hash.js "<senha>"');
  process.exit(1);
}

const hash = bcrypt.hashSync(senhaPura, 10);

console.log("============================================================");
console.log("SEU HASH PARA COLOCAR NO BANCO DE DADOS É:");
console.log(hash);
console.log("============================================================");
