"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";

function Header() {

  const path=usePathname();
  useEffect(()=>{
      console.log(path)
  },[])

  return (
    <div className="flex p-4 items-center justify-end bg-secondary shadow-sm">
      {/* <Image src={"/logo.svg"} width={160} hegiht={100} all="logo" /> */}

      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard'&&'text-blue-900 font-bold'}
          `}
          >Dashboard</li>
        <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/Questions'&&'text-primary font-bold'}
          `}>Questions</li>
        <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/Upgrade'&&'text-primary font-bold'}
          `}>Upgrade</li>
        <li className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard/how'&&'text-primary font-bold'}
          `}>How is Works?</li>
        < UserButton />
      </ul>
  
    </div>
  );
}

export default Header;
