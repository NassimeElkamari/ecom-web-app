"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { images } from "./jeansData";

const Jeans = () => {
  const [width, setWidth] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(550);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const controls = images.map(() => useAnimation());

  const handleClick = (index: any) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  useEffect(() => {
    controls.forEach((control, index) => {
      if (selectedImage === index) {
        control.start({ y: -35, scale: 1.03 });
      } else {
        control.start({ y: 0, scale: 1 });
      }
    });
  }, [selectedImage, controls]);

  return (
    <div className=" h-[100vh] mt-[10vh]">
      <div className="relative flex justify-center  z-20">
        <h1 className="absolute text-white font-serif bg-zinc-800 rounded-full mr-[25%] text-5xl pt-1 pb-1 pr-7 pl-7">
          𝙽ew
        </h1>
        <h1 className="absolute text-white font-serif mt-8 text-5xl ml-[10%]">
          Jeans Collection
        </h1>
        <div className="absolute  w-[180px] h-10 bottom-5 left-[63%] ">
          <Image
            src={"/assets/JeansCollection/signature.png"}
            alt="k"
            unoptimized={true}
            width={180}
            height={180}
          />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <motion.div
          ref={carousel}
          className="carousel cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            className="inner-carousel flex py-28 overflow-hidden"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="item min-w-[19.5rem] min-h-[] p-[15px] relative"
              >
                {" "}
                <motion.div
                  onClick={() => handleClick(index)}
                  animate={controls[index]}
                >
                  <Image
                    src={image.src}
                    className="rounded-3xl pointer-events-none"
                    width={500}
                    height={500}
                    alt=""
                  />
                </motion.div>
                <motion.div
                  className="flex absolute justify-center items-end bottom-1 gap-2 bg-[#292929] left-3 w-[289px] h-[80px] rounded-b-3xl -z-10"
                  initial={{ y: 100, opacity: 0 }}
                  animate={
                    selectedImage === index
                      ? { y: 0, opacity: 1 }
                      : { y: 100, opacity: 0 }
                  }
                >
                  {" "}
                  <div className="mb-3 rounded-full w-[6px] h-[16px] bg-[#FEFEFE] cursor-pointer"></div>
                  <div className="mb-4 rounded-full w-[6px] h-[6px] bg-[#434343]"></div>
                  <div className="mb-4 rounded-full w-[6px] h-[6px]  bg-[#434343]"></div>
                  <div className="mb-4 rounded-full w-[6px] h-[6px] bg-[#434343]"></div>
                  <div className="mb-4 rounded-full w-[6px] h-[6px] bg-[#434343]"></div>
                </motion.div>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={
                    selectedImage === index
                      ? { y: 0, opacity: 1 }
                      : { y: 100, opacity: 0 }
                  }
                  className="flex absolute justify-between items-end left-3 -bottom-16 bg-[#292929] rounded-b-3xl w-[289px] h-[110px] -z-20 "
                >
                  <div className="px-8 py-4 text-sm rounded-tr-3xl bg-[#434343] rounded-bl-3xl h-[65px] border-t-[1px] border-r-[1px] border-black w-2/3 text-white">
                    {image.name}
                  </div>
                  <div className="px-8 py-5 text-lg rounded-tl-3xl bg-[#434343] rounded-br-3xl w-1/3 h-[65px] border-t-[1px] border-l-[1px] border-black text-white">
                    {image.price}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Jeans;
