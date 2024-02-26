import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";
import bookmarks from "../reducers/bookmarks";
import likedMovies from "../reducers/likedMovies";
const reducers = combineReducers({ user, bookmarks, likedMovies });
const persistConfig = { key: "Discover", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Discover</title>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
