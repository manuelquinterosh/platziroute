require('ignore-styles');

require('@babel/register')({
    presets: ['@babel/preset-env', //Para trabajar con ES5, ES6
              '@babel/preset-react'], //Para trabajar con JSX
});

require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif'],
    name: '/assets/[hash].[ext]',
});

require('./server');