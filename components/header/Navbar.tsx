"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  BiLogoInstagramAlt,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import useCartService from "@/lib/hooks/useCartStore";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-between items-center container text-white pt-4 pb-4">
      <div className="flex-1 flex container">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-15 w-15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h11M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="text-white">Homepage</a>
            </li>
            <li>
              <a className="text-white">Profil</a>
            </li>
            <li>
              <a className="text-white">About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-[4] justify-center items-center">
        <div className="mr-[20px] w-[30px] h-[30px] bg-white rounded-full relative cursor-pointer">
          <BiLogoTwitter
            color="black"
            className="w-[23px] h-[23px] absolute left-1 top-1"
          />
        </div>
        <div className="mr-[20px] w-[30px] h-[30px] bg-white rounded-full relative cursor-pointer">
          <BiLogoInstagramAlt
            color="black"
            className="w-[23px] h-[23px] absolute left-1 top-1"
          />
        </div>
        <div className="mr-[20px] w-[30px] h-[30px] bg-white rounded-full relative cursor-pointer">
          <BiLogoYoutube
            color="black"
            className="w-[23px] h-[23px] absolute left-1 top-1"
          />
        </div>
      </div>
      {/* {session ? ( */}
      {/* <div className="w-1/6 h-31 flex justify-between gap-2  items-center border border-gray-600 rounded-full">
          <div className="ml-[5px] mr-[10px] cursor-pointer mt-1"><button onClick={()=>signOut() }><IoPersonSharp className='w-6 h-6 p-[2px] bg-white rounded-full' color='black'/></button></div>
          <div className='flex '>
          <div className="ml-[10px] mr-[10px] cursor-pointer"><IoHeart  className='w-6 h-6 bg-white rounded-full p-[2px]' color='black'/></div>
          <div className=" mr-[5px] cursor-pointer"><MdShoppingBag className='w-6 h-6 bg-white rounded-full p-[1px]' color='black'/></div>
          </div>
        </div>
      ) : ( */}
      <div className="w-1/5 h-15 flex justify-between gap-2  items-center border border-gray-600 rounded-full">
        <div className="w-[65%]">
          <p className="text-black text-lg bg-white rounded-full  cursor-pointer text-center">
            <Link href="/login" className="text-sm font-semibold align-middle">
              Member Login
            </Link>
          </p>
        </div>
        <div className="ml-[10px] mr-[5px] cursor-pointer">
          <IoHeart
            className="w-6 h-6 bg-white rounded-full p-1"
            color="black"
          />
        </div>
        <div className="ml-[5px] mr-[3px] cursor-pointer flex">
          <Link className="rounded-btn" href="/store/cart">
            <MdShoppingBag
              className="w-6 h-6 bg-white rounded-full p-1"
              color="black"
            />
            {mounted && items.length != 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, c) => a + c.qty, 0)}{" "}
              </div>
            )}
          </Link>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Navbar;
