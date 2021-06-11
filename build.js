const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const terser = require('terser');

const srcFolder = 'src';
const distFolder = 'dist';

const name = 'frost-dom';

// create dist folder if it doesn't exist
if (!fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder);
}

// load files and wrapper
let bundleWrapper, wrapper;
const files = [];
const core = fs.readFileSync('./node_modules/frostcore/dist/frost-core.js');

filepath.create(srcFolder).recurse(fullPath => {
    if (!fullPath.isFile()) {
        return;
    }

    if (path.extname(fullPath.path) === '.js') {
        const fileName = path.basename(fullPath.path, '.js');
        const data = fs.readFileSync(fullPath.path, 'utf8');

        if (fileName === 'bundle_wrapper') {
            bundleWrapper = data;
        } else if (fileName === 'wrapper') {
            wrapper = data;
        } else {
            files.push(data);
        }
    }
});

// inject code to wrapper
const code = wrapper.replace(
    '    // {{code}}',
    files.join('\r\n')
        .replace(
            /^(?!\s*$)/mg,
            ' '.repeat(4)
        )
);

const bundle = bundleWrapper.replace(
    '    // {{code}}',
    _ => [core, code].join('\r\n\r\n')
        .replace(
            /^(?!\s*$)/mg,
            ' '.repeat(4)
        )
);

// minify
terser.minify(code, {
    ecma: 8,
    compress: {
        ecma: 8
    }
}).then(minified => {
    fs.writeFileSync(
        path.join(distFolder, name + '.js'),
        code
    );

    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}).catch(error => {
    console.error(error);
});

terser.minify(bundle, {
    ecma: 8,
    compress: {
        ecma: 8
    }
}).then(minified => {
    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.js'),
        bundle
    );

    fs.writeFileSync(
        path.join(distFolder, name + '-bundle.min.js'),
        minified.code
    );
}).catch(error => {
    console.error(error);
});