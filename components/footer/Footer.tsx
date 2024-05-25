import React from "react";

const footerData = [
  {
    title: "Categories",
    links: ["T-shirt", "Tank Top", "Sweatshirt", "Hoodie", "Shirts"],
  },
  {
    title: "New Items",
    links: ["Basic", "Summer87", "Classic", "Oversized"],
  },
  {
    title: "We are ?",
    links: ["About Us", "Contact"],
  },
  {
    title: "Contracts",
    links: ["Privacy Policy", "Sales Agreement", "Cookie Policy"],
  },
  {
    title: "Help",
    links: ["FAQ", "Delivery & Returns"],
  },
  {
    title: "My Account",
    links: ["Orders", "Refund Requests"],
  },
];

const Footer = () => {
  return (
    <>
      <div className="w-full text-gray-300 pl-7">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 py-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h6 className="font-bold uppercase pt-2">{section.title}</h6>
              <ul>
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="py-1 text-sm text-gray-500 font-extralight hover:text-white cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
