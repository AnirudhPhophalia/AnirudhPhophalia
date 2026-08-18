const fs = require('fs');
const svg = fs.readFileSync('insights.svg', 'utf8');
const start = svg.indexOf('<style>');
const end = svg.indexOf('</style>');
console.log(svg.substring(start, end + 8));
