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

function TableEditor({ user, tableId, tableData }) {
  const [tableProducts, setTableProducts] = useState(null);
  const [previewTableProducts, setPreviewTableProducts] = useState(null);

  console.log(tableData.table_cards);

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

  async function handleAddFeature() {}

  async function handleRemoveFeature() {}

  async function handleSetHighlightColor() {}

  function handleSetProductVisible() {}

  useEffect(() => {
    parseTableCards();
  }, []);

  if (tableData)
    return (
      <div className="bg-stone-50 min-h-screen">
        <div className="py-5 flex items-center justify-between shadow-b shadow-md px-24 bg-white">
          <Link className="cursor-pointer" href="/dashboard">
            <span className="font-bold text-xl">saascribe</span>
          </Link>
        </div>

        <div className="pt-10 px-24 space-y-5">
          <div className="space-y-5 border-b">
            <div>
              <Link className="cursor-pointer" href="/dashboard">
                <Button variant="outline">Back</Button>
              </Link>
            </div>
            <div className="pb-10 ">
              <span className="font-semibold text-xl">
                {tableData.table_name}
              </span>
            </div>
          </div>

          <div className="flex space-x-10 pt-5 justify-between">
            {tableProducts && (
              <div className="w-1/4 space-y-5">
                <div>
                  <span className="font-semibold">
                    Products ({tableProducts && tableProducts.length})
                  </span>
                </div>
                {tableProducts.map((tableProduct, index) => (
                  <div key={index} className="p-5 border rounded-xl bg-white space-y-7">
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">
                          {tableProduct.attributes.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">
                          {tableProduct.attributes.price_formatted}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-semibold">Features</span>
                      </div>

                      <div>
                        <span className="text-sm text-stone-600">
                          Features will be listed here when added.
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Input placeholder="Add feature name..." />
                        <Button>Add</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-semibold">
                          Customization
                        </span>
                      </div>
                      <div className="">
                        {" "}
                        <div className="flex items-center space-x-3">
                          <div>
                            <span className="text-sm">Visible</span>
                          </div>
                          <Checkbox />
                        </div>
                        <div className="flex items-center space-x-3 pt-2">
                          <div>
                            <span className="text-sm">Highlighted</span>
                          </div>
                          <Checkbox />
                        </div>
                        <ColorPicker defaultValue="#1677ff" />
                        <div className="flex items-center space-x-3 pt-2">
                          <div>
                            <span className="text-sm">Button Color</span>
                          </div>
                        </div>{" "}
                        <ColorPicker defaultValue="#1677ff" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="text-sm font-medium">
                          CTA Button Text
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Add feature name..." value={"Get Started"}/>
                        <Button>Save</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-3/4 space-y-5">
              <div className="flex  justify-between">
                <span className="font-semibold">Table Preview</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Get embed code</Button>{" "}
                  <Button>Save</Button>
                </div>
              </div>
              <div className="grid grid-cols-3">
                {previewTableProducts &&
                  previewTableProducts.map((previewTableProduct, index) => (
                    <div
                      key={index}
                      className={`bg-white p-10 border rounded-2xl shadow-md cursor-pointer rounded-md space-y-5  ${
                        highlightedProducts.includes(product)
                          ? "border-blue-500"
                          : ""
                      }`}
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
                        {features && features.length < 1 && (
                          <div>
                            <span className="text-sm text-stone-500">
                              Features will be listed here.
                            </span>
                          </div>
                        )}
                        <div className="space-y-3">
                          {/* {features &&
                          features.length > 0 &&
                          getFeaturesForProduct(index).map(
                            (item, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center space-x-2 text-stone-600 text-sm "
                              >
                                <img src="/img/tick.svg" className="h-7 w-7" />
                                <span className="text-lg">{item.feature}</span>
                              </div>
                            )
                          )} */}
                        </div>
                      </div>

                      <div className="">
                        <Link
                          href={product.attributes.buy_now_url}
                          target="_blank"
                        >
                          <button className="w-full py-3 rounded-xl text-white hover:opacity-80 bg-indigo-600 text-lg">
                            Get Started
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!tableData) return <div className="pt-10">Loading...</div>;
}

export default TableEditor;
