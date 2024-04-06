"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import StoreComponent from "@/components/StoreComponent";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/utils/SupabaseProvider";
import Settings from "@/components/Settings";
import readUserSession from "@/lib/actions";
import supabase from "@/utils/supabase";
import ProfileDropdown from "./ProfileDropdown";

function DashboardComponent({ user }) {
  const [apiKey, setApiKey] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [storeSelected, setStoreSelected] = useState(false);
  const { toast } = useToast();
  const [stores, setStores] = useState([]);
  const router = useRouter();
  const [activePage, setActivePage] = useState("dashboard");
  const [apiKeyInput, setApiKeyInput] = useState("");

  function handleSelectStore(id) {
    setSelectedStoreId(id);
    setStoreSelected(true);
  }

  function handleDeselectStore(id) {
    setSelectedStoreId(null);
    setStoreSelected(false);
  }

  async function addApiKeyToSupabase() {
    const insertData = {
      user_api_key: apiKeyInput,
      user_id: user.id,
      user_email: user.email,
    };
    const { data, error } = await supabase.from("api_keys").insert(insertData);

    if (!error) {
      console.log(data);
      fetchUserApiKey();
    }
  }

  async function fetchUserApiKey() {
    const { data, error } = await supabase
      .from("api_keys")
      .select("user_api_key")
      .eq("user_id", user.id)
      .single();

    if (!error) {
      console.log(data.user_api_key);
      setApiKey(data.user_api_key);
      const key = data.user_api_key;
      handleGetLemonSqueezyData(key);
    }
  }

  async function handleGetLemonSqueezyData(apiKey) {
    if (apiKey !== "") {
      // Define the API endpoint
      const apiUrl = "https://api.lemonsqueezy.com/v1/stores";

      // Define the headers including the Authorization header with your API key
      const headers = {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey.trim()}`,
      };

      // Make the API call
      axios
        .get(apiUrl, { headers })
        .then((response) => {
          const arr = response.data.data;
          console.log(arr);

          if (arr.length > 0) {
            setStores(arr);
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
        });
    }
  }

  function handleBackToDashboard() {
    setActivePage("dashboard");
    setStoreSelected(false);
  }

  async function handleConnectApiKey() {
    if (apiKeyInput != "") {
      console.log(apiKeyInput);
      var key = apiKeyInput;
      setApiKey(key);

      handleGetLemonSqueezyData(key);
    }
  }

  useEffect(() => {
    fetchUserApiKey();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-screen pb-12 pt-5">
      <Toaster />
      <div className="py-3 px-5 shadow-md flex items-center justify-between rounded-xl bg-white border">
        <div className="cursor-pointer" onClick={() => handleBackToDashboard()}>
          <span className="font-bold text-xl">saascribe</span>
        </div>

        {user && apiKey ? (
          <div className="flex items-center space-x-7">
            <ProfileDropdown
              apiKey={apiKey}
              setActivePage={setActivePage}
              user={user}
            />
          </div>
        ) : (
          <div className="rounded-full bg-stone-300 h-10 w-10"></div>
        )}
      </div>

      {activePage == "settings" && (
        <div className="space-y-5 pt-10">
          <Settings
            handleGetLemonSqueezyData={handleGetLemonSqueezyData}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
        </div>
      )}

      {activePage == "dashboard" && apiKey == "" && (
        <div className="mx-auto max-w-2xl pt-48 space-y-7">
          <div className="text-center">
            <span className="text-2xl font-medium">
              Welcome to saascribe. To get started, <br></br>connect your
              LemonSqueezy store.
            </span>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center space-x-2 ">
              <Input
                onChange={(e) => setApiKeyInput(e.target.value)}
                value={apiKeyInput}
                className="py-3"
                placeholder="Your LemonSqueezy API Key..."
              />
              <button
                onClick={() => addApiKeyToSupabase()}
                className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:opacity-85 w-1/3"
              >
                Connect store
              </button>
            </div>
          </div>
        </div>
      )}

      {activePage == "dashboard" && apiKey != "" && (
        <div className="space-y-5 ">
          {selectedStoreId != null && storeSelected == true ? (
            <StoreComponent
              apiKey={apiKey}
              index={selectedStoreId}
              handleDeselectStore={handleDeselectStore}
              user={user}
            />
          ) : (
            <div className="space-y-3 pt-10">
              <div className="flex items-center justify-between">
                <div>
                  {" "}
                  <span className="font-semibold text-lg">My Stores</span>
                </div>
              </div>
              {stores && stores.length > 0 ? (
                <div className="grid grid-cols-3 gap-5">
                  {stores.map((store, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectStore(store.id)}
                      className="bg-white p-7 border-2 rounded-md flex space-x-3 cursor-pointer hover:bg-stone-100"
                    >
                      <img
                        src={store && store.attributes.avatar_url}
                        className="h-12 w-12 rounded-md bg-stone-200 border"
                      ></img>
                      <div className="">
                        <div>
                          {" "}
                          <span className="font-medium">
                            {store.attributes.name}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span className="text-sm">{store.id}</span>
                        </div>
                        <div>
                          {" "}
                          <span className=" line-clamp-1 truncate text-xs">
                            {store.attributes.url}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pt-3">Loading stores...</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
