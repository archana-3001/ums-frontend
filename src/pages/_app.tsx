import '@/styles/globals.css'
import { ErrorBoundary } from 'react-error-boundary';

import type { AppProps } from 'next/app'
import RefreshProvider from '@/state/RefreshProvider';

declare global{
  interface Window{
    
  }
}

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ErrorBoundary fallbackRender={MyFallbackComponent}>
      <RefreshProvider>
    
    <Component {...pageProps} />
     </RefreshProvider>
    </ErrorBoundary>
  
 
  );
}


function MyFallbackComponent({ error }: { error: Error }) {
  return (
      <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">
      <h1>Something went wrong:</h1>
      <pre>{error?.message}</pre>
      </div>
    </div>
  );
}