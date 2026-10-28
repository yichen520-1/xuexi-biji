import {renderToString} from 'react-dom/server';import {StaticRouter} from 'react-router-dom/server.js';
import {Provider} from 'react-redux';import {makeStore} from './store.ts';import App from './App';
export function renderSmoke(){return renderToString(<Provider store={makeStore()}><StaticRouter location="/"><App/></StaticRouter></Provider>);}
