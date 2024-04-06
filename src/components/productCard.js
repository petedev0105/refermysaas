import React from "react";
import { Checkbox } from "./ui/checkbox";

function ProductCard({
  product,
  onSelect,
  onHighlight,
  features,
  setFeatures,
  index,
}) {
  return (
    <div
      key={index}
      className="hover:bg-slate-50 flex items-center w-full justify-between border-b w-full px-3 py-2 cursor-pointer"
    >
      <div className="">
        <div className="">
          <span className="text-xs font-medium">{product.attributes.name}</span>
        </div>
        <div>
          <span className="text-xs">{product.attributes.price_formatted}</span>
        </div>
      </div>
      <Checkbox onClick={() => onSelect(product)} />
    </div>
  );
}

export default ProductCard;
