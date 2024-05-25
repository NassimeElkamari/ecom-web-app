"use client";
import { useState } from "react";
import Image from "next/image";

const Ourblog = () => {
  const [activeBlog, setActiveBlog] = useState(1);

  const handleArticleClick = (index: any) => {
    setActiveBlog(index === activeBlog ? null : index);
  };

  const Blogs = [
    {
      title: "1. Lets know more about the Summer87 collection?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu ex in ante pellentesque auctor vel in massa. Morbi at rhoncus nisi.",
      categories: ["Summer87", "Collections", "Unisex"],
      image: "/assets/ourblog/3.png",
    },
    {
      title: "2. How to be basic but stylish?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus eu ex in ante pellentesque auctor vel in massa. Morbiat rhoncus nisi.",
      categories: ["Basic", "Classic"],
      image: "/assets/ourblog/1.png",
    },
    {
      title: "3. How to make your outfits better?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus eu ex in ante pellentesque auctor vel in massa. Morbiat rhoncus nisi.",
      categories: ["Outfits", "Hacks"],
      image: "/assets/ourblog/2.png",
    },
  ];

  return (
    <>
      <section className="container text-white h-[100vh]">
        <div className="">
          {" "}
          <div className="relative flex justify-center z-20">
            <h1 className="absolute text-white font-serif bg-zinc-800 rounded-full mr-[19%] text-5xl pt-1 pb-1 px-7">
              O𝚞r
            </h1>
            <h1 className="absolute text-white font-serif mt-8 text-5xl ml-[11%]">
              F𝚊shion Blo𝑔
            </h1>
            <div className="absolute w-[180px] h-10 left-[28%] -bottom-24">
              <Image
                src={"/assets/todaysTrending/signature3.png"}
                alt=""
                unoptimized={true}
                width={180}
                height={180}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-24">
          <div className="py-9 sm:p-3 lg:pl-5 ">
            {Blogs.map((blog, index) => (
              <article
                key={index}
                className={`py-3 rounded-3xl shadow-md mb-4 cursor-pointer p-2 ${
                  activeBlog === index ? "bg-[#1F1F1F] p-6" : ""
                }`}
                onClick={() => handleArticleClick(index)}
              >
                <h2 className="text-2xl sm:text-[18px] font-semibold xl:text-xl mb-2">
                  {blog.title}
                </h2>
                <p className="text-xs xl:text-[14px] sm:text-[14px] font-extralight text-opacity-0 mb-4">
                  {blog.content}
                </p>
                <div className="flex flex-wrap space-x-2">
                  {blog.categories.map((category, categoryIndex) => (
                    <span
                      key={categoryIndex}
                      className={`px-3 py-1 md:px-1 md:py-2 sm:px-3 sm:py-2 xl:px-4 lg:py-3 text-white text-md md:text-xs sm:text-[10px] lg:text-[15px] 
                      ${ activeBlog === index ? "bg-black border-none" : "" } border rounded-full`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="relative">
            {activeBlog !== null && (
              <div className="transition-opacity duration-500">
                <Image
                  src={Blogs[activeBlog].image}
                  width={500}
                  height={0}
                  alt="Article Image"
                  className="rounded-3xl object-cover w-full h-full md:h-[90%] sm:h-[50%]"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Ourblog;
