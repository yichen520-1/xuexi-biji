import {StrictMode} from 'react';import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';import {Provider} from 'react-redux';
import {store} from './store.ts';import App from './App';import './style.css';
const root=document.getElementById('root');if(!root)throw new Error('root 容器不存在');
createRoot(root).render(<StrictMode><Provider store={store}><HashRouter><App/></HashRouter></Provider></StrictMode>);
