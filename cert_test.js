const fs = require('fs');

let bufferKey = fs.readFileSync(".tls/domain.key");
let keyValue = bufferKey.toString('utf-8');
console.log(keyValue);
let bufferCert = fs.readFileSync(".tls/domain.crt");
let certValue = bufferCert.toString('utf-8');
console.log(certValue);