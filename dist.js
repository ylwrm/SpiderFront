const ncp = require('ncp').ncp;
const fs = require('fs');
var glob = require("glob");

if (!fs.existsSync(process.cwd() + '\\dist')) {
    fs.mkdirSync(process.cwd() + '\\dist');
}
if (!fs.existsSync(process.cwd() + '\\dist\\Libs')) {
    fs.mkdirSync(process.cwd() + '\\dist\\Libs');
}

// # libs
const libs = [
    'handsontable\\dist\\handsontable.full.min.*',
    'spiderlib\\dist\\spiderlib.js',
    'spiderpackageprimary\\dist\\*.js'
]
for (let iL = 0; iL < libs.length; iL++) {
    const lib = libs[iL];
    console.log('\n %%% update [' + lib + ']!');
    const root = process.cwd() + '\\';
    const srcRoot = 'node_modules\\';
    const tarRoot = 'dist\\Libs\\';
    glob(srcRoot + lib, (err, matches) => {
        for (let iM = 0; iM < matches.length; iM++) {
            const match = matches[iM];
            const matchSub = match.substring(srcRoot.length);
            const src = (root + match).replace(new RegExp('/','g'), '\\');
            const tar = (root + tarRoot + matchSub).replace(new RegExp('/','g'), '\\');
            const paths = tar.split('\\');
            const folder = (tar.substr(0, tar.length - paths[paths.length - 1].length - 1)).replace(new RegExp('/','g'), '\\');
            fs.mkdirSync(folder, { recursive: true });
            fs.copyFileSync(src, tar);
        }
    });
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

// const root = process.cwd() + '\\';
// const srcRoot = 'node_modules\\';
// const tarRoot = 'dist\\Libs\\';


// glob(srcRoot + 'handsontable\\dist\\handsontable.full.min.*', (err, matches) => {
//     for (let iM = 0; iM < matches.length; iM++) {
//         const match = matches[iM];
//         const matchSub = match.substring(srcRoot.length);console.log(match);
//         const src = root + match;
//         const tar = root + tarRoot + matchSub;
//         const paths = tar.split('\\');
//         const folder = tar.substr(0, tar.length - paths[paths.length - 1].length - 1);
//         fs.mkdirSync(folder, { recursive: true });
//         fs.copyFileSync(src, tar);
//     }
// });
