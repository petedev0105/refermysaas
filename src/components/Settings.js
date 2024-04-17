import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

function Settings({ apiKey, setApiKey, handleGetLemonSqueezyData, addApiKeyToSupabase}) {
  const [userApiKey, setUserApiKey] = useState("");
  const { toast } = useToast();

  async function handleConnectApiKey() {
    if (userApiKey != "") {
      console.log(userApiKey);
      var key = userApiKey;
      setApiKey(key);

      addApiKeyToSupabase(userApiKey);

      // handleGetLemonSqueezyData(key);

      toast({
        title: "Saved API Key!",
        description: "Your LemonSqueezy API is saved successfully.",
      });
    }
  }

  useEffect(() => {
    if (apiKey != "") {
      setUserApiKey(apiKey);
      console.log(apiKey);
    }
  }, []);

  return (
    <div className="">
      <Toaster />
      <div className="flex items-center justify-between pb-5">
        <span className="font-semibold text-2xl">Settings</span>
      </div>
      <span className="text-sm font-medium">Lemon Squeezy API Key</span>
      <div className="flex items-center space-x-2 pt-2">
        <Input
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
          placeholder="Your LemonSqueezy API Key..."
          className="w-1/2"
        />
        <Button onClick={() => handleConnectApiKey()}>Save</Button>
      </div>
    </div>
  );
}

export default Settings;
