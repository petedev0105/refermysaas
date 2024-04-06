import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

function ProductItem({
  product,
  onSelect,
  onHighlight,
  features,
  setFeatures,
  index,
}) {
  const [feature, setFeature] = useState("");

  const handleAddFeature = () => {
    if (feature.trim() != "") {
      // Handle adding feature for the product
      console.log("Adding feature:", feature);
      setFeature("");
      setFeatures([...features, { productIndex: index, feature: feature }]);
    }
  };

  // Function to filter features based on the product index
  const getFeaturesForProduct = (productIndex) => {
    return features.filter((feature) => feature.productIndex === productIndex);
  };

  return (
    <div className="bg-white p-7 border-2 rounded-xl cursor-pointer rounded-md space-y-5 ">
      <div>
        <span className="font-medium text-lg truncate line-clamp-1">
          {product.attributes.name}
        </span>
      </div>
      <div>
        <span className="line-clamp-1">
          {product.attributes.price_formatted}
        </span>
      </div>
      {features && features.length < 1 && (
        <div>
          <span className="text-sm text-stone-500">
            Features will be listed here.
          </span>
        </div>
      )}
      <div className="space-y-2">
        {features &&
          features.length > 0 &&
          getFeaturesForProduct(index).map((item, featureIndex) => (
            <div
              key={featureIndex}
              className="text-stone-600 text-sm px-3 py-2 rounded-md bg-stone-50 border hover:bg-stone-100"
            >
              <span>{item.feature}</span>
            </div>
          ))}
      </div>

      <div className="flex items-center space-x-3">
        <Input
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          placeholder="Feature name..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddFeature();
            }
          }}
        />
        <Button onClick={handleAddFeature}>Add feature</Button>
      </div>

      <div className="space-y-2 pt-5 border-t">
        <div className="flex items-center space-x-3">
          <div>
            <span className="text-sm">Show</span>
          </div>
          <Checkbox onClick={() => onSelect(product)} />
        </div>
        <div className="flex items-center space-x-3">
          <div>
            <span className="text-sm">Highlighted</span>
          </div>
          <Checkbox onClick={() => onHighlight(product)} />
        </div>
        <div className="space-y-1 pt-5">
          <span className="text-xs font-medium">Button text</span>{" "}
          <div className="flex items-center space-x-3">
            <Input
              value={"Get Started"}
              placeholder="CTA Button text..."
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleAddFeature();
              //   }
              // }}
            />
            <Button variant="outline">Set text</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
