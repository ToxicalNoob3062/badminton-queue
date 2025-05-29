/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import StoreProvider from './providers/stores.tsx';
import ModalProvider from './providers/modal';

const root = document.getElementById('root')

render(() =>
  <StoreProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StoreProvider>, root!)
