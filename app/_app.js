
import { AuthProvider } from './authContext.js'; 

function MyApp({ Component, pageProps }) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
  
  export default MyApp;
