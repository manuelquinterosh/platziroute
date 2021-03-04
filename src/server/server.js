import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'; //Nos va permitir encapsular nuestros componentes por medio de un conect el cual va tener toda la informacion del store transmitida a estos componentes
import { createStore } from 'redux'; //La logica que nos va ayudar para poder tener un store y compartirselo a nuestra aplicacion
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import initialState from '../frontend/utils/initialState.js';
import getManifest from './getManifest';

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

if (ENV === 'development') { //Para definir si nuestro entorno es de desarrollo
  console.log(`Development config ${ENV}`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  //creating a webpack compiler with our configurations
  const compiler = webpack(webpackConfig); //executing webpack with its configurations

  const serverConfig = { serverSideRender: true }; //declaring the port and enabling hot reload in dev server

  //adding the middlewares into the server
  app.use(webpackDevMiddleware(compiler, serverConfig)); //Middleware to compile all the files and put it on the server
  app.use(webpackHotMiddleware(compiler)); //Middleware to enable hot reload
} else {
  app.use((req, res, next) => { //middleware
    if(!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`)); //La ruta a donde vamos apuntar nuestra carpeta publica
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'sha256-lKtLIbt/r08geDBLpzup7D3pTCavi4hfYSO45z98900='"],
        'img-src': ["'self'", 'http://dummyimage.com'],
        'style-src-elem': ["'self'", 'https://fonts.googleapis.com'],
        'font-src': ['https://fonts.gstatic.com'],
        'media-src': ['*'],
      },
    }),
  );
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="${mainStyles}" type="text/css">
        <meta charset="utf-8" />
        <title>React App</title>
    
      </head>
      <body>
     
        <div id="app">${html}</div>
        <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
      </body>
    </html>
    `
  );
}

const renderApp = (req, res) => {
    
  const store = createStore(reducer, initialState); //para poder tener referencia a nuestro store
  const preloadedState = store.getState(); //Nos va traer todo el estado inicial configurado
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};


app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Serverr is running in port ${PORT}`);
});

