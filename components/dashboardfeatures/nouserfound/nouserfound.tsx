import React from "react";
import { CgDanger } from "react-icons/cg";

const Nouserfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex text-4xl">No user found <CgDanger className="text-red-500 text-5xl items-center justify-center" /></div>
    </div>
  );
};

export default Nouserfound;
