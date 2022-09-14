import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'players',
  storage,
  whitelist: ['game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
if (window.Cypress) {
  window.store = store;
}

const persistor = persistStore(store);

export { store, persistor };
