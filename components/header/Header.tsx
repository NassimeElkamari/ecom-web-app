import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-200 ">
          <div>
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h18M4 12h13M4 18h9"
                ></path>
              </svg>
            </label>
            <Link href="/" className="btn btn-ghost text-lg font-bold">
              MɅGИITUDE
            </Link>
          </div>

          <Menu />
        </div>
        <div className="bg-base-300 block md:hidden text-center pb-3">
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
