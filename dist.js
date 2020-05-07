const ncp = require('ncp').ncp;
const fs = require('fs');

const libs = ['spiderlib'];

if (!fs.existsSync(process.cwd() + '\\dist')) {
    fs.mkdirSync(process.cwd() + '\\dist');
}
if (!fs.existsSync(process.cwd() + '\\dist\\Libs')) {
    fs.mkdirSync(process.cwd() + '\\dist\\Libs');
}
// # root
console.log('\n %%% update root!');
ncp(
    process.cwd() + '\\root',
    process.cwd() + '\\dist',
    (err) => {
        if (err) {
            return console.error(err)
        }
    }
);

// # libs
for (let iL = 0; iL < libs.length; iL++) {
    const lib = libs[iL];
    console.log('\n %%% update [' + lib + ']!');
    ncp(
        process.cwd() + '\\node_modules\\' + lib,
        process.cwd() + '\\dist\\Libs\\' + lib,
        (err) => {
            if (err) {
                return console.error(err)
            }
        }
    );
}