"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Footer } from "./footer";
import Header from "./Header";


export function Receive() {
  const [copiedAddress, setCopiedAddress] = useState("");
  const router = useRouter();

  const assets = [
    {
      name: "Naira",
      type: "fiat",
      details: {
        accountNumber: "1234567890",
        bank: "Test Bank",
      },
    },
    {
      name: "USD",
      type: "fiat",
      details: {
        accountNumber: "9876543210",
        bank: "Global Bank",
      },
    },
    {
      name: "USDT",
      type: "crypto",
      details: {
        address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      },
    },
    {
      name: "Bitcoin",
      type: "crypto",
      details: {
        address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
      },
    },
    {
      name: "KES",
      type: "fiat",
      details: {
        accountNumber: "4567890123",
        bank: "Kenya National Bank",
      },
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAddress(text);
      setTimeout(() => setCopiedAddress(""), 3000);
    });
  };

  const handleContinue = () => {
    router.push("/pages/home"); // Redirect to home page
  };

  return (
    <><div className="flex flex-col w-full max-w-[360px] h-full bg-gray-900 text-white mx-auto rounded-lg shadow-lg overflow-hidden">
        <Header />
      <main className="flex-1 overflow-auto p-4">
        <Tabs defaultValue={assets[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-1 mb-4">
            {assets.map((asset) => (
              <TabsTrigger
                key={asset.name}
                value={asset.name}
                className="text-sm text-center bg-gray-700 hover:bg-gray-600 rounded-md p-2 mr-2"
              >
                {asset.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {assets.map((asset) => (
            <TabsContent key={asset.name} value={asset.name}>
              <Card className="p-4 bg-gray-800 mb-5 mt-20 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-center text-white">
              Receive {asset.name}
                </h2>

                {asset.type === "fiat" ? (
                  <div className="space-y-3">
                    <p className="mb-1 text-sm text-white">Account Number: {asset.details.accountNumber}</p>
                    <p className="text-sm text-white">Bank: {asset.details.bank}</p>
                    <Button className="mt-4 w-full" variant="outline">
                      Pay with Card
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="break-all text-sm text-white">{asset.details.address}</p>
                      <Button
                        className="ml-2 p-2"
                        variant="outline"
                        onClick={() => copyToClipboard(asset.details.address)}
                      >
                        {copiedAddress === asset.details.address ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </Button>
                    </div>
                    <Alert variant="destructive">
                      <AlertTitle className="font-semibold">Warning</AlertTitle>
                      <AlertDescription className="text-sm">
                        Make sure you're sending {asset.name} to this address.
                        Sending other currencies may result in permanent loss.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="bg-gray-800 p-4 mb-10">
        <Button
          className="w-full bg-green-600 hover:bg-green-500"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </footer>
    </div><Footer /></>
  );
}
