// pages/_app.js
// Global app wrapper — keeps CSS reset consistent with the main page

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
