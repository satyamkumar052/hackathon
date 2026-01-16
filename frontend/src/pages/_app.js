<<<<<<< HEAD
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
=======
import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";


export default function App({ Component, pageProps }) {
  return <>

    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>

  </> 
>>>>>>> origin/main
}
