var fs = require('fs'),
    path = require('path');

/*
 * Resulting object
 */
var result = {};

console.log('Reading caniuse data');

var caniuse = JSON.parse( 
    fs.readFileSync( path.join(__dirname, 'modules', 'caniuse', 'data.json') ).toString()
);

result.agents = caniuse.agents;
result.caniuse = {
    statuses: caniuse.statuses,
    categories: caniuse.cats,

    features: caniuse.data
};

console.log('Done reading caniuse data');

console.log('Reading es5-compat-table data');

var es5 = require('./modules/es5-compat-table/data-es5');

result.es5 = {
    features: es5.tests
};

console.log('Done reading es5-compat-table data');

console.log('Writing output');

fs.writeFileSync(
    path.join(__dirname, 'out', 'data.json'),
    JSON.stringify(result)
);

console.log('Done');

