import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store, persistor } from "./utils/redux/store/mainStore.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1082128291118-32scaqkih8iu24lt5om5m4jr9mphe6c2.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
