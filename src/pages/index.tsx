import Head from 'next/head'
import { Inter } from '@next/font/google'
import LoginForm from '@/components/login-form'
import { Layout } from '@/components/layout'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
         <LoginForm/>
 
  
        </Layout>
        
      </main>
        
        </body>
       
       
      </>
    )
  }
  
}
