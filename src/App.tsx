import { Toaster } from "react-hot-toast";
import store from "./store";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { RouterConfigure } from "./Pages/config";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={RouterConfigure} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#212020",
            color: "#fff",
            borderColor: "#333",
            borderWidth: "1px",
          },
        }}
      />
    </Provider>
  );
}

export default App;
