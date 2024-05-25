import React from "react";
import Image from "next/image";

const Partners = () => {
  return (
    <div className="container relative mb-9 pb-10 sm:mb-2 p-4">
      <Image
        src="/assets/partners/partners.jpg"
        alt=""
        width={400}
        height={400}
        className="filter brightness-[15%] w-full rounded-3xl"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-white xl:text-5xl sm:text-3xl text-center font-bold p-4">
          LETS BECOME A <br />
          PARTNERSHIP
        </span>
      </div>
    </div>
  );
};

export default Partners;
