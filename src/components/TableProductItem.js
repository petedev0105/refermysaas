import React from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ColorPicker } from "antd";
import { useState } from "react";
import SkeletonInput from "antd/es/skeleton/Input";

function TableProductItem({
  tableProduct,
  index,
  onVisibilityToggle,
  isVisible,
  onHighlightToggle,
  isHighlighted,
  color,
  onAddFeature,
}) {
  const [newFeature, setNewFeature] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [features, setFeatures] = useState([]);

  const addFeature = () => {
    if (inputValue !== "") {
      setFeatures((prevFeatures) => [...prevFeatures, inputValue]);
      onAddFeature(tableProduct.id, inputValue);
      console.log(tableProduct.id, inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addFeature();
    }
  };
  return (
    <div key={index} className="p-7 border-2 rounded-xl bg-white space-y-7">
      <div className="space-y-2">
        <div>
          <span className="font-semibold text-lg">
            {tableProduct.attributes.name}
          </span>
        </div>
        <div>
          <span className="text-sm border py-1 rounded-full bg-stone-100 px-3 font-medium">
            {tableProduct.attributes.price_formatted}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-sm font-semibold">Features</span>
        </div>

        {features && features.length > 0 ? (
          features.map((feature, index) => (
            <div key={index} className="p-2 border rounded-md shadow-sm">
              <span className="text-sm">{feature}</span>
            </div>
          ))
        ) : (
          <span className="text-sm text-stone-600">
            Features will be listed here when added.
          </span>
        )}

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add feature name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addFeature();
              }
            }}
          />
          <Button onClick={() => addFeature()}>Add</Button>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-sm font-semibold">Customization</span>
        </div>
        <div className="">
          {" "}
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-sm">Visible</span>
            </div>
            <Checkbox
              onClick={() => onVisibilityToggle()}
              checked={isVisible}
            />
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <div>
              <span className="text-sm">Highlighted</span>
            </div>
            <Checkbox
              onClick={() => onHighlightToggle()}
              checked={isHighlighted}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <span className="text-sm font-medium">CTA Button Text</span>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Add feature name..." value={"Get Started"} />
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default TableProductItem;
