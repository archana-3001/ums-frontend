import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Layout } from '@/components/layout'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { lazy } from 'react'

// import { getHistoricalMessages } from "../lib/history";
const inter = Inter({ subsets: ['latin'] })


const LoginFormComponent=(dynamic(async()=>(await import('../components/login-form')).LoginFormComponent, {
  ssr: false,
}))

export default function Home() {
  const [initialRenderComplete, setInitialRenderComplete]=useState(false);
 
  useEffect(()=>{
    setInitialRenderComplete(true);
  },[])
  if(initialRenderComplete){
    return (
      <>
        <Head>
          <title>User Management System</title>
          <meta name="description" content="UMS" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
        <main>
        
      <Layout>
        <LoginFormComponent/>
      </Layout>
      </main>
        
        </body>
       
       
      </>
    )
  }
  
}
