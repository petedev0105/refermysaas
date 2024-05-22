import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../lib/sanity";

function ProductComponent({ product }) {
  const {
    currentSlug,
    productSlogan,
    productCategory,
    productCommission,
    productLogo,
    productName,
  } = product;

  return (
    <div>
      <Link href={`/product-view/${currentSlug}`}>
        <div className="rounded-xl p-5 space-y-5 cursor-pointer bg-stone-50 hover:shadow-md">
          <div className="flex space-x-3">
            <img
              src={productLogo ? urlFor(productLogo) : null}
              alt={productName}
              className="h-12 w-12 rounded-md bg-stone-200 border object-cover"
            />


            <div className="w-full">
              <div>
                <span className="font-semibold">{productName}</span>
              </div>
              <div className="truncate w-5/6">
                <span className="text-sm truncate max-w-1/2">
                  {productSlogan}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              <span className="text-sm text-stone-700 truncate">
                {productCategory && productCategory.join(", ")}
              </span>
            </div>
            <div className="px-3 py-1 rounded-full flex justify-center bg-green-100 text-green-600 font-medium">
              <span className="text-xs">{productCommission}% Commission</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductComponent;
