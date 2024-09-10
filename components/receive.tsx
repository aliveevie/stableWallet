'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export function Receive() {
  const [copiedAddress, setCopiedAddress] = useState('')

  const assets = [
    {
      name: 'Naira',
      type: 'fiat',
      details: {
        accountNumber: '1234567890',
        bank: 'Test Bank',
      },
    },
    {
      name: 'USDT',
      type: 'crypto',
      details: {
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      },
    },
    {
      name: 'Bitcoin',
      type: 'crypto',
      details: {
        address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      },
    },
  ]

  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAddress(text)
      setTimeout(() => setCopiedAddress(''), 3000)
    })
  }

  return (
    <div className="flex flex-col w-[360px] h-[640px] bg-gray-900 text-white overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-xl font-bold">Receive</h1>
        <div className="w-6 h-6"></div>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <Tabs defaultValue={assets[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {assets.map((asset) => (
              <TabsTrigger key={asset.name} value={asset.name}>
                {asset.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {assets.map((asset) => (
            <TabsContent key={asset.name} value={asset.name}>
              <Card className="p-4 bg-gray-800">
                <h2 className="text-lg font-semibold mb-2">Receive {asset.name}</h2>
                {asset.type === 'fiat' ? (
                  <div>
                    <p className="mb-1">Account Number: {asset.details.accountNumber}</p>
                    <p>Bank: {asset.details.bank}</p>
                    <Button className="mt-4 w-full" variant="outline">
                      Pay with Card
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2 break-all">{asset.details.address}</p>
                    <Button
                      className="w-full mb-4"
                      variant="outline"
                      onClick={() => copyToClipboard(asset.details.address)}
                    >
                      {copiedAddress === asset.details.address ? 'Copied!' : 'Copy Address'}
                    </Button>
                    <Alert variant="destructive">
                      <AlertTitle className="font-semibold">Warning</AlertTitle>
                      <AlertDescription>
                        Make sure you're sending {asset.name} to this address. Sending other currencies may result in permanent loss.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="bg-gray-800 p-4">
        <Button className="w-full" variant="default">
          Done
        </Button>
      </footer>
    </div>
  )
}