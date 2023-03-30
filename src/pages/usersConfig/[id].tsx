import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
const UserUpdateForm=(dynamic(async ()=>  (await import('@/components/userUpdateForm')).UserUpdateForm, {
    ssr: false,
  })); 

  const ImageComponent=(dynamic(async()=>(await import('@/components/imageComponent')).ImageComponent, {
    ssr: false
  }));

const  User=()=>{
    const router=useRouter();
    const [id, setId]=useState<any>(null);
    const [user, SetUser]=useState<any>({});
   
    useEffect(()=>{
        if(!router.isReady) return;
        const obj=JSON.parse(router.query?.user as string);
        console.log("setting id");
        setId(router.query?.id);
        SetUser(obj);
        
        console.log(obj);
    }, [router.isReady]);
   
    
    if(!id && !user){
        return <p>Loading....</p>
    }
    return(
        <>
        <nav className="flex items-center justify-between flex-wrap bg-white py-5 lg:px-12 shadow border-solid border-t-2 border-blue-700">
    <ul className="flex w-full flex-wrap items-center h-50 ">
        <li className="text-md font-bold text-blue-700 lg:flex-auto flex-direction: row-reverse">
            <ImageComponent/>
        </li>
        </ul></nav>
        <Link href={`/usersConfig`}><FaArrowCircleLeft className="text-3xl font-bold text-blue-700"/></Link>
        <UserUpdateForm user={user} id={id}/>
        
        </>
    )
}
export default User;