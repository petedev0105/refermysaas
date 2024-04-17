import React from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";
import supabase from "@/utils/supabase";
import { Checkbox } from "./ui/checkbox";
import { ColorPicker } from "antd";
import TableProductItem from "./TableProductItem";

function TableEditor({ user, tableId, tableData }) {
  const [tableProducts, setTableProducts] = useState(null);
  const [previewTableProducts, setPreviewTableProducts] = useState(null);
  const [color, setColor] = useState("#000000");

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);

  function parseTableCards() {
    let parsedProductsArr = [];
    const tableProductsArr = tableData.table_cards;
    tableProductsArr.map((tableProduct) => {
      let parsedTableProduct = JSON.parse(tableProduct);
      parsedProductsArr.push(parsedTableProduct);
    });

    console.log(parsedProductsArr);
    setTableProducts(parsedProductsArr);
  }

  // async function handleAddFeature() {}

  async function handleRemoveFeature() {}

  async function handleSetHighlightColor() {}

  function handleSetProductVisible() {}

  function handleSaveTable() {
    if (visibleProducts && visibleProducts.length > 0) {
      console.log(visibleProducts);
    }
  }

  function handleChangeColor(value) {
    setColor(value);
    console.log(value);
  }

  function handleProductVisibilityToggle(product) {
    console.log(product);
    const isVisible = visibleProducts.some(
      (visibleProduct) => visibleProduct.id === product.id
    );

    if (isVisible) {
      setVisibleProducts((prevVisibleProducts) =>
        prevVisibleProducts.filter(
          (visibleProduct) => visibleProduct.id !== product.id
        )
      );
    } else {
      setVisibleProducts((prevVisibleProducts) => [
        ...prevVisibleProducts,
        product,
      ]);
    }
  }

  function handleAddFeature(productId, newFeature) {
    setProductFeatures((prevProductFeatures) => ({
      ...prevProductFeatures,
      [productId]: [...(prevProductFeatures[productId] || []), newFeature],
    }));

    console.log(productId, newFeature);
  }

  function handleProductHighlightToggle(product) {
    const isHighlighted = highlightedProducts.some(
      (highlightedProduct) => highlightedProduct.id === product.id
    );

    if (isHighlighted) {
      setHighlightedProducts((prevHighlightedProducts) =>
        prevHighlightedProducts.filter(
          (highlightedProduct) => highlightedProduct.id !== product.id
        )
      );
    } else {
      setHighlightedProducts((prevHighlightedProducts) => [
        ...prevHighlightedProducts,
        product,
      ]);
    }
  }

  useEffect(() => {
    parseTableCards();
  }, [tableData]);

  if (tableData)
    return (
      <div className="bg-stone-50 min-h-screen">
        <div className="py-5 flex items-center justify-between shadow-b shadow-md px-24 bg-white">
          <Link className="cursor-pointer" href="/dashboard">
            <span className="font-bold text-xl">saascribe</span>
          </Link>
        </div>

        <div className="pt-10 px-24 space-y-5">
          <div className="space-y-5">
            <div>
              <Link className="cursor-pointer" href="/dashboard">
                <Button variant="outline">Back</Button>
              </Link>
            </div>
            <div className="pb-10 pt-5 flex items-center justify-between">
              <div className="">
                <div><span className="text-sm text-stone-500">Editing</span></div>
                
                <span className="font-semibold text-2xl">
                  {tableData.table_name}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline">Preview in new tab</Button>
                <Button variant="outline">Get embed code</Button>{" "}
              </div>
            </div>
          </div>

          <div className="flex space-x-10 pt-5 justify-between">
            {tableProducts && (
              <div className="w-1/4 space-y-5 pb-12 ">
                <div>
                  <span className="font-bold">Customization</span>
                </div>
                <div className="rounded-xl border-2 bg-white p-7">
                  <div className="items-center justify-between flex">
                    <span className="font-medium">Theme Color</span>
                    <ColorPicker
                      defaultValue={color}
                      format="hex"
                      onChangeComplete={(color) => {
                        handleChangeColor(color.toHexString());
                      }}
                    />
                  </div>
                  <div className="items-center justify-between flex pt-5">
                    <span className="font-medium">Has free plan</span>
                    <Checkbox />
                  </div>
                </div>
                <div className="pt-5">
                  <span className="font-bold">
                    Products ({tableProducts && tableProducts.length})
                  </span>
                </div>
                {tableProducts.map((tableProduct, index) => (
                  <TableProductItem
                  key={index}
                    tableProduct={tableProduct}
                    index={index}
                    onVisibilityToggle={() =>
                      handleProductVisibilityToggle(tableProduct)
                    }
                    isVisible={visibleProducts.some(
                      (visibleProduct) => visibleProduct.id === tableProduct.id
                    )}
                    onHighlightToggle={() =>
                      handleProductHighlightToggle(tableProduct)
                    }
                    isHighlighted={highlightedProducts.some(
                      (highlightedProduct) =>
                        highlightedProduct.id === tableProduct.id
                    )}
                    color={color}
                    onAddFeature={handleAddFeature}
                  />
                ))}
              </div>
            )}

            <div className="w-3/4 space-y-5">
              <div className="flex  justify-between">
                <span className="font-semibold">Table Preview</span>
              </div>
              <div>
                {visibleProducts &&
                  visibleProducts.length < 1 &&
                  "Choose products to start building out your pricing table."}
              </div>
              <div className="grid grid-cols-3 gap-5">
                {/* {visibleProducts && visibleProducts.length > 0 && visibleProducts.map((product, index) => <div>123</div>)} */}
                {visibleProducts &&
                  visibleProducts.map((product, index) => (
                    <div
                      style={{
                        border: highlightedProducts.some(
                          (highlightedProduct) =>
                            highlightedProduct.id === product.id
                        )
                          ? `2px solid ${color}`
                          : "",
                      }}
                      key={product.id}
                      className={`bg-white p-10 border rounded-2xl shadow-xl cursor-pointer rounded-xl space-y-5 `}
                    >
                      <div>
                        <span className="truncate line-clamp-1 text-stone-600">
                          {product.attributes.name}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-3">
                        <span className="text-5xl font-semibold">
                          ${product.attributes.price / 100}
                        </span>
                        <span className="text-sm">/month</span>
                      </div>
                      <div className="space-y-3 py-5">
                        {/* {features && features.length < 1 && (
                          <div>
                            <span className="text-sm text-stone-500">
                              Features will be listed here.
                            </span>
                          </div>
                        )} */}
                        {/* <div className="space-y-3">
                          {features &&
                            features.length > 0 &&
                            getFeaturesForProduct(index).map(
                              (item, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-center space-x-2 text-stone-600 text-sm "
                                >
                                  <img
                                    src="/img/tick.svg"
                                    className="h-7 w-7"
                                  />
                                  <span className="text-lg">
                                    {item.feature}
                                  </span>
                                </div>
                              )
                            )}
                        </div> */}

                        {productFeatures && productFeatures.length < 1 && (
                          <span className="text-sm text-stone-600 font-light">
                            Features for this product will show up here when
                            added.
                          </span>
                        )}

                        {productFeatures[product.id] &&
                          productFeatures[product.id].map((feature, index) => (
                            <div key={index} className="pb-2 border-b">
                              <span>{feature}</span>
                            </div>
                          ))}
                      </div>

                      <div className="">
                        <Link
                          href={product.attributes.buy_now_url}
                          target="_blank"
                        >
                          <button
                            className={`w-full py-3 rounded-xl text-white hover:opacity-89 text-lg`}
                            style={{ backgroundColor: color }}
                          >
                            Get Started
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="pt-5 flex items-center justify-end">
                <Button onClick={() => handleSaveTable()}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!tableData) return <div className="pt-10">Loading...</div>;
}

export default TableEditor;
