import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistedStore, store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster position="top-center" />
  </BrowserRouter>
);
