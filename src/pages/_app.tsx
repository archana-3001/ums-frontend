import '@/styles/globals.css'



import type { AppProps } from 'next/app'
import RefreshProvider from '@/state/RefreshProvider';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <RefreshProvider>
    
 <Component {...pageProps} />
  </RefreshProvider>
 
  );
}
