import { Product } from "@/lib/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "./Rating";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-[#070707] border-white rounded-3xl border-[1px]  ">
      <figure className="bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707]">
        <Link href={`/store/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover h-64 w-68"
          />
        </Link>
      </figure>
      <div className="card-body rounded-3xl bg-[#070707] items-center flex">
        <Link href={`/store/product/${product.slug}`}>
          <p className="text-sm font-light text-white">{product.name}</p>
        </Link>
        <div className="card-actions flex items-center justify-between">
          <p className="text-sm font-light">${product.price}</p>
        </div>
        <Rating value={product.rating} caption={`(${product.numReviews})`} />
      </div>
    </div>
  );
}
