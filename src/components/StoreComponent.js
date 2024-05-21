import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import ProductItem from "./productItem";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import supabase from "@/utils/supabase";
import { v4 as uuid } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import SelectRadio from "./SelectRadio";
import ProductCard from "./productCard";
import { useRouter } from "next/navigation";

function StoreComponent({ index, handleDeselectStore, user, apiKey }) {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [pricingTables, setPricingTables] = useState([]);
  const [tableNameInput, setTableNameInput] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  async function fetchStoreData() {
    const apiUrl = `https://api.lemonsqueezy.com/v1/stores/${index}`;
    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey.trim()}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      setStore(response.data.data.attributes);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  }

  async function fetchStoreProducts() {
    const apiUrl = `https://api.lemonsqueezy.com/v1/products?filter[store_id]=${index}`;
    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey.trim()}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching store products:", error);
    }
  }

  useEffect(() => {
    fetchStoreData();
    fetchStoreProducts();
    console.log(user);
  }, [index]);

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((p) => p !== product)
        : [...prevSelected, product]
    );
  };

  const handleHighlightProduct = (product) => {
    if (highlightedProducts.includes(product)) {
      setHighlightedProducts((prevHighlighted) =>
        prevHighlighted.filter((p) => p !== product)
      );
    } else {
      setHighlightedProducts((prevHighlighted) => [
        ...prevHighlighted,
        product,
      ]);
      if (!selectedProducts.includes(product)) {
        // Only add to selectedProducts if it's not already selected
        // setSelectedProducts((prevSelected) => [...prevSelected, product]);
      }
    }
  };

  // Function to filter features based on the product index
  const getFeaturesForProduct = (productIndex) => {
    return features.filter((feature) => feature.productIndex === productIndex);
  };

  async function fetchPricingTables() {
    const { data, error } = await supabase
      .from("pricing_tables")
      .select("*")
      .eq("user_id", user.id)
      .eq("store_id", index);

    if (!error) {
      console.log(data);
      setPricingTables(data);
    }
  }

  async function handleAddPricingTable() {
    // console.log(selectedProducts);
    if (tableNameInput.trim() != "" && selectedProducts.length > 0) {
      const tableId = uuid();
      const tableData = {
        table_name: tableNameInput,
        user_id: user.id,
        table_id: tableId,
        table_cards: selectedProducts,
        table_preview_cards: [],
        store_id: index,
      };

      console.log(tableData);
      const { data, error } = await supabase
        .from("pricing_tables")
        .insert(tableData);

      if (!error) {
        toast({
          title: "Created new table!",
          description: "You can now start editing your table.",
        });
        fetchPricingTables();

        if (router.isReady) {
          router.push(`/table-editing/${tableId}`);
        }
      }

      // console.log(selectedProducts)
    } else {
      toast({
        title: "Name is missing.",
        description: "Type in the name of your pricing table.",
      });
    }
  }

  // handleSetProducts() {
  //   if()
  // }

  async function handleDeleteTable(tableId) {
    const {data, error} = await supabase
    .from("pricing_tables")
    .delete()
    .eq("table_id", tableId);

    if(!error) {
      fetchPricingTables();
      toast({
        title: "Deleted table!",
        description: "The table has been deleted."
      })
      
    }
    
  }

  useEffect(() => {
    fetchPricingTables();
  }, [index]);

  return (
    <div className="space-y-5">
      <Toaster />
      {store && (
        <>
          <div className="pt-7">
            <Button variant="outline" onClick={handleDeselectStore}>
              Back
            </Button>
          </div>
          <div className="flex justify-between flex p-7 rounded-xl shadow-md bg-white border">
            <div className="rounded-md flex space-x-3 cursor-pointer">
              <div className="">
                <img
                  src={store.avatar_url}
                  className="h-12 w-12 rounded-md bg-stone-200 border"
                  alt="Store Avatar"
                />
                <div className="pt-5">
                  <span className="font-medium text-2xl">{store.name}</span>
                </div>
                <div>
                  <span className="text-sm">{store.url}</span>
                </div>
              </div>
            </div>
            {/* <div>
              <Button variant="outline">View emded code</Button>
            </div> */}
          </div>

          <div className="flex items-center justify-between pt-12 pb-5">
            <div>
              <span className="font-medium text-lg">
                My pricing tables ({pricingTables && pricingTables.length})
              </span>
            </div>
            <Sheet>
              <SheetTrigger>
                <Button>New pricing table +</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add new pricing table</SheetTitle>
                  <SheetDescription>
                    Add a new pricing table and start editing it to fit your
                    preferences.
                  </SheetDescription>
                  <div className="pt-5">
                    <div className="pb-2">
                      <span className="text-sm font-semibold">Table Name</span>
                    </div>
                    <div>
                      <Input
                        value={tableNameInput}
                        onChange={(e) => setTableNameInput(e.target.value)}
                        placeholder="Name of the pricing table..."
                      />
                    </div>
                    <div className="pb-2 pt-5">
                      <span className="text-sm font-semibold">
                        Select products
                      </span>
                    </div>{" "}
                    <div>
                      {/* <SelectRadio /> */}
                      {products &&
                        products.length < 1 &&
                        "No products in this store yet."}
                      {products && products.length > 0 && (
                        <>
                          <div className="max-h-[350px] border rounded-md overflow-auto ">
                            {products &&
                              products.length > 0 &&
                              products.map((product, index) => (
                                <ProductCard
                                  index={index}
                                  features={features}
                                  setFeatures={setFeatures}
                                  key={product.id}
                                  product={product}
                                  onSelect={handleSelectProduct}
                                  onHighlight={handleHighlightProduct}
                                />
                              ))}
                          </div>
                          <div className="flex justify-end pt-3">
                            <Button onClick={() => handleAddPricingTable()}>
                              Start editing
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div className="">
            {pricingTables && pricingTables.length > 0 && (
              <div className="grid grid-cols-3 gap-5">
                {pricingTables.map((pricingTable, index) => (
                  <div key={index} className="bg-white rounded-md border p-3 cursor-pointer0 space-y-3 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <img
                        src={store.avatar_url}
                        className="h-7 w-7 rounded-md bg-stone-200 border"
                        alt="Store Avatar"
                      />
                      <div className="w-2/3 line-clamp-1 text-elipsis">
                        <span className="font-medium ">
                          {pricingTable.table_name}{" "}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 border-t pt-5">
                      <div>
                        <Link
                          // target="_blank"
                          key={index}
                          href={`/table-editing/${pricingTable.table_id}`}
                        >
                          <button className="text-sm font-medium px-3 py-1 rounded-md hover:bg-stone-50 border">
                            View table
                          </button>{" "}
                        </Link>
                      </div>
                      <div className="">
                        <img
                          onClick={() => handleDeleteTable(pricingTable.table_id)}
                          src="/img/Trash.svg"
                          className="h-9 w-9 hover:bg-stone-100 rounded-md cursor-pointer p-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pricingTables && pricingTables.length < 1 && (
              <div>
                <span>No pricing tables yet.</span>
              </div>
            )}
          </div>

          {/* <div className="flex space-x-10 pt-10">
            <div className="w-1/4 space-y-5">
              <div>
                <span className="font-medium">
                  Products ({products.length})
                </span>
              </div>

              <div className="space-y-5">
                {products.map((product, index) => (
                  <ProductItem
                    index={index}
                    features={features}
                    setFeatures={setFeatures}
                    key={product.id}
                    product={product}
                    onSelect={handleSelectProduct}
                    onHighlight={handleHighlightProduct}
                  />
                ))}
              </div>
            </div>

            <div className="w-3/4 space-y-5">
              <div>
                <span className="font-medium">Table preview</span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {selectedProducts.length < 1 && (
                  <div>Select a product to get started.</div>
                )}
                {selectedProducts.map((product, index) => (
                  <div
                    key={product.id}
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
                        {features &&
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
                          )}
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
          </div> */}
        </>
      )}

      {!store && <div>Loading store...</div>}
    </div>
  );
}

export default StoreComponent;
