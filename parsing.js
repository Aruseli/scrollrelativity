const { readFileSync, writeFileSync } = require('fs');

const list = readFileSync('./public/list').toString();
const array = list.split('\n\n').splice(1, 40);
writeFileSync('./public/list.json', JSON.stringify(array));