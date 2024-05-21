import React from "react";
import Link from "next/link";

function ProductComponent({ product }) {
  const { id, product_name, product_slogan, product_description, product_category, product_commission, product_photo_url, product_website_link, product_affiliate_program_link } = product;

  return (
    <div>
      <Link href={`/product-view/${id}`}>
        <div className="rounded-lg border p-3 space-y-5 hover:border-black cursor-pointer">
          <div className="flex space-x-3">
            <img src={product_photo_url} alt={product_name} className="h-12 w-12 rounded-md bg-stone-200" />
            <div>
              <div>
                <span className="font-semibold">{product_name}</span>
              </div>
              <div>
                <span className="text-sm truncate max-w-1/2">{product_slogan}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-stone-500">{product_category.join(', ')}</span>
            </div>
            <div className="px-3 py-1 rounded-full flex justify-center bg-stone-100 border">
              <span className="text-xs">{product_commission}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductComponent;
