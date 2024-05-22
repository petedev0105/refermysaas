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
        <div className="rounded-xl border p-3 space-y-5 hover:bg-stone-50 cursor-pointer">
          <div className="flex space-x-3">
            <img
              src={productLogo ? urlFor(productLogo) : null}
              alt={productName}
              className="h-12 w-12 rounded-md bg-stone-200 border object-cover"
            />

            {/* <Image
              src={urlFor(productLogo)}
              alt={productName}
              className="h-12 w-12 rounded-md bg-stone-200"
            /> */}

            <div>
              <div>
                <span className="font-semibold">{productName}</span>
              </div>
              <div>
                <span className="text-sm truncate max-w-1/2">
                  {productSlogan}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-stone-500">
                {productCategory && productCategory.join(" | ")}
              </span>
            </div>
            <div className="px-3 py-1 rounded-full flex justify-center bg-black text-white">
              <span className="text-xs">{productCommission}%</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductComponent;
