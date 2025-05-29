/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import ModalProvider from './providers/modal';

const root = document.getElementById('root')

render(() => <ModalProvider>
  <App />
</ModalProvider>, root!)
