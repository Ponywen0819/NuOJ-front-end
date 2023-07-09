'use client'

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo-white.svg';
import { usePathname } from 'next/navigation';
import { auth_context } from '@/contexts/auth';
import { useContext, useState } from 'react';

const UserDropDown = ({handle}) =>{
    let profile_url = "/profile/" + handle;
    let auth = useContext(auth_context);
    let navigate = useNavigate();

    const handleLogout = async () =>{
        let state_code = await auth.signout();
        if(state_code !== 200) {
            error_swal("發生錯誤","發生預期外的錯誤導致無法登出！");
        }
        else{
            success_swal("已登出").then(()=>navigate("/"))
        }
    }

    const drops = [
        {title: "個人檔案", to: profile_url},
        {title: "設定", to: "/setting"},
    ]

    let element_class = "text-black border-b-2 border-white border-opacity-0 duration-500 hover:border-black hover:border-opacity-100 text-left"
    return(
        <div className="absolute w-32 right-px top-0 pt-10">
            <div className='flex flex-col shadow-3xl w-full rounded-sm p-2 bg-white gap-2 border-2 duration-500'>
                {
                    drops.map((drop)=>(
                        <Link className={element_class} href={drop.to} key={drop.title}>{drop.title}</Link>
                    ))
                }
                <button onClick={handleLogout} className={element_class}>登出</button>
            </div>  
        </div>
    )
}

const User = () =>{
    const [drop, setDrop] = useState(false);
    let auth = useContext(auth_context);
    let user = auth.getUser();

    let element_class = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100"
    return(
        <div className="flex gap-20 items-center min-h-[7vh] justify-end w-[20%]">
            {
                (user.state === 1)?(
                    <div onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>setDrop(false)} className="relative">
                    <p className={element_class} > { user.handle } </p>
                    {
                        drop && <UserDropDown handle={ user.handle }></UserDropDown>
                    }
                </div>
                ):(
                    <>
                        <Link className={element_class} href="/auth/login"> 登入 </Link>
                        <Link className={element_class} href="/auth/register"> 註冊 </Link>
                    </>
                )
            }
        </div>
    )
}

export const Navbar = ({
    links
})=>{
    const path = usePathname();
    const NavColor = (path === "/")? '' : "bg-black"
    const NavClass = `absolute p-10 w-full flex justify-between h-32 z-10` + NavColor;
    const LinkClass = "text-white text-2xl border-b-2 border-white border-opacity-0 duration-500 hover:border-white hover:border-opacity-100 ml-10"
    const auth = useContext(auth_context);

    return(
        <nav className={NavClass}>
            <div className={'flex items-center'}>
                <div>
                    <Link href={"/"} className='h-full'>
                        <Image src={logo} width={128}></Image>
                    </Link>
                </div>
                {
                    links.map((link)=>(
                        <Link
                            className={LinkClass}
                            href={link.href}
                        >{link.title}</Link>
                    ))
                }
            </div>
            <User></User>
        </nav>
    )
}