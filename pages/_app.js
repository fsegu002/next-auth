// import App from 'next/app'
import React from 'react';
import { Provider } from 'mobx-react';
import { useStore } from '../src/store/Store';
import 'mobx-react-lite/batchingForReactDom';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
