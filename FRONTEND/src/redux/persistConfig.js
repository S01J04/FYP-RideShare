import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'accessToken','vehicle'], // Persist both
};


export default persistConfig;
