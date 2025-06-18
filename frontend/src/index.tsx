import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import { checkAuthAction } from 'store/api-actions/user-api-actions';
import { ToastContainer } from 'react-toastify';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ToastContainer />
			<App />
		</Provider>
	</React.StrictMode>
);
