"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiShoppingBag2Line } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";

interface ItemColor {
  color: string;
  image: string;
}

const itemsColor: ItemColor[] = [
  { color: "#B09CDB", image: "/assets/newArrival/PURPLE.png" },
  { color: "#989697", image: "/assets/newArrival/GREY.png" },
  { color: "#1EC79E", image: "/assets/newArrival/green.png" },
  { color: "#b09d84", image: "/assets/newArrival/sand.png" },
  { color: "#C75712", image: "/assets/newArrival/ORANGE.png" },
  { color: "#745B58", image: "/assets/newArrival/brown.png" },
  { color: "#372c39", image: "/assets/newArrival/PURPLE2.png" },
  { color: "#014748", image: "/assets/newArrival/GREEN2.png" },
  { color: "#C56671", image: "/assets/newArrival/PINK.png" },
];

function getColorClass(color: string) {
  switch (color) {
    case "#B09CDB":
      return "bg-[#B09CDB]";
    case "#989697":
      return "bg-[#989697]";
    case "#1EC79E":
      return "bg-[#1EC79E]";
    case "#b09d84":
      return "bg-[#b09d84]";
    case "#C75712":
      return "bg-[#C75712]";
    case "#745B58":
      return "bg-[#745B58]";
    case "#372c39":
      return "bg-[#372c39]";
    case "#014748":
      return "bg-[#014748]";
    case "#C56671":
      return "bg-[#C56671]";

    default:
      return "";
  }
}

interface ItemSize {
  size: string;
}

const itemsSize: ItemSize[] = [
  { size: "S" },
  { size: "M" },
  { size: "L" },
  { size: "XL" },
  { size: "2XL" },
];

const sizeMap: { [key: string]: string } = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "X-Large",
  "2XL": "2 X-Large",
};

const ItemButton = ({
  size,
  changeImage,
}: {
  size: string;
  changeImage: () => void;
}) => {
  const [showFullSize, setShowFullSize] = useState(false);

  return (
    <button
      className={`w-${
        showFullSize ? size.length * 6 + 12 : 10
      } h-10 p-1 transition-all duration-3000 rounded-full text-center `}
      onMouseEnter={() => setShowFullSize(true)}
      onMouseLeave={() => setShowFullSize(false)}
      style={{
        backgroundColor: showFullSize ? "transparent" : "#222",
        border: showFullSize ? "solid 1px white" : "solid 2px #222",
        padding: showFullSize ? "8px" : "4px",
      }}
      onClick={changeImage}
    >
      {showFullSize ? sizeMap[size] : size}
    </button>
  );
};

const ColorButton = ({
  color,
  changeImage,
}: {
  color: string;
  changeImage: () => void;
}) => {
  return (
    <button
      className={`h-10 w-10 rounded-full border mt-3 ${getColorClass(color)}`}
      onClick={changeImage}
    ></button>
  );
};

function NewArrival() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>(
    itemsColor[0].image
  );

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up") {
      setScrollIndex(
        (prevIndex) => (prevIndex - 1 + itemsColor.length) % itemsColor.length
      );
    } else {
      setScrollIndex((prevIndex) => (prevIndex + 1) % itemsColor.length);
    }
  };

  const changeImage = (image: string) => {
    setSelectedImage(image);
  };

  const changeImageByColor = (color: string) => {
    const selected = itemsColor.find((item) => item.color === color);
    if (selected) {
      setSelectedImage(selected.image);
    }
  };

  return (
    <div className=" mb-[250px] mt-[-90px] container h-[80vh] w-[100vw]  px-20 py-10  ">
      <div className="relative flex justify-center h-20 z-20">
        <h1 className="absolute text-white font-serif bg-zinc-800 rounded-full mr-[15%] text-5xl pt-1 pb-1 pr-7 pl-7">
          𝙽ew
        </h1>
        <h1 className="absolute text-white font-serif mt-8 text-5xl ml-[8%]">
          𝙰rrivals
        </h1>
        <div className="absolute w-[180px] h-[110px]  left-[20%] bottom-[20%]">
          <Image
            src={"/assets/newArrival/signature1.png"}
            alt="k"
            unoptimized={true}
            width={180}
            height={180}
          />
        </div>
      </div>
      <div className="flex justify-between items-center h-[60vh] w-full mt-[10%]">
        <div className="">
          <button
            className="relative h-12 w-16 flex justify-center text-white"
            onClick={() => handleScroll("up")}
            disabled={scrollIndex === 0}
          >
            <span className="absolute left-[13px] top-[20px]">▲</span>
          </button>
          <div className="h-44 w-16">
            <div className="overflow-y-hidden h-52 w-16 mb-4">
              <ul
                className="transition-transform duration-300"
                style={{ transform: `translateY(-${scrollIndex * 52}px)` }}
              >
                {itemsColor.map((item, index) => (
                  <li key={index}>
                    <ColorButton
                      color={item.color}
                      changeImage={() => changeImageByColor(item.color)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex h-20  mt-5 items-end">
            <button
              className="relative h-12 w-16 text-white"
              onClick={() => handleScroll("down")}
              disabled={scrollIndex === itemsColor.length - 4}
            >
              <span className="absolute left-[13px] top-[0px]">▼</span>
            </button>
          </div>

          <div className="flex mt-[12%]">
            <div className="flex flex-col text-[#aaa4a4]">
              <div className="flex items-center justify-between text-[#ebe7e2]">
                <h3 className="text-2xl">Renado Oswat Hoodie</h3>
              </div>
              <p className="text italic">Limited editions</p>
            </div>
          </div>
        </div>
        <div className="relative mb-12">
          <Image
            src={selectedImage}
            alt=""
            unoptimized={true}
            width={450}
            height={450}
          />
        </div>
        <div className="">
          <ul className="mb-5 mt-[-15px] flex flex-col justify-end items-end">
            {itemsSize.map((item, index) => (
              <li
                key={index}
                className={`rounded-full text-white ${
                  index >= 0 && "mt-4"
                } flex justify-center text-center`}
              >
                <ItemButton
                  size={item.size}
                  changeImage={() => changeImage(itemsColor[0].image)}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <div className="flex flex-col text-[#aaa4a4]">
              <div className=" flex justify-end items-end  text-[#ebe7e2]">
                <p>Size & fit guide </p>
                <div className="ml-4">
                  <MdArrowOutward />
                </div>
              </div>
              <p className="text italic w-72 text-sm">
                You can check the table and smart sizing.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" h-12 w-96 rounded-3xl border my-12 z-10">
          <button className=" relative h-12 w-72 border rounded-3xl bg-white text-black">
            <span className=" absolute left-[72px] top-[15px]">
              <RiShoppingBag2Line />
            </span>
            Add to cart
          </button>
          <span className=" float-right mr-3 flex items-center h-12">
            $259.00
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;
