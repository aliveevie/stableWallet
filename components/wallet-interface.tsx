'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FaBars, FaPaperPlane, FaDownload, FaSyncAlt, FaHistory, FaLifeRing, FaWallet, FaCog, FaLiraSign, FaPoundSign, FaDollarSign, FaEuroSign, } from 'react-icons/fa'
import Image from 'next/image'
import Footer from '@/app/components/footer'

export function WalletInterface() {
  const [balance, setBalance] = useState(1234.56)
  const [assets, setAssets] = useState([
    { name: 'Nigerian Naira', amount: 50000, value: 62.5, icon: '/placeholder.svg?height=40&width=40', symbol: '₦' },
    { name: 'Ghanaian Cedi', amount: 1000, value: 83.33, icon: '/placeholder.svg?height=40&width=40', symbol: '₵' },
    { name: 'Kenyan Shilling', amount: 15000, value: 100, icon: '/placeholder.svg?height=40&width=40', symbol: 'KSh' },
    { name: 'US Dollar', amount: 500, value: 500, icon: '/placeholder.svg?height=40&width=40', symbol: '$' },
    { name: 'Euro', amount: 200, value: 220, icon: '/placeholder.svg?height=40&width=40', symbol: '€' },
  ])

  return (
    <div className="flex flex-col w-[360px] h-[640px] bg-gray-900 text-white overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <FaBars className="w-6 h-6 hover" />
        <div className="flex items-center space-x-2">
          <span className="text-sm">SW</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">${balance.toFixed(2)}</h1>
          <p className="text-gray-400 text-xs">Available Balance <span className="text-gray-500">ⓘ</span></p>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <Button variant="outline" className="flex flex-col items-center p-2 bg-gray-800 hover:bg-gray-700">
            <FaPaperPlane className="w-4 h-4 mb-1" />
            <span className="text-xs">Send</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-2 bg-gray-800 hover:bg-gray-700">
            <FaDownload className="w-4 h-4 mb-1" />
            <span className="text-xs">Receive</span>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col px-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">My Assets</h2>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-black">
              <FaSyncAlt className="w-3 h-3 mr-1" />
              Refresh
            </Button>
          </div>

          <div className="overflow-y-auto flex-1 -mx-4 px-4">
            {assets.map((asset) => (
              <Card key={asset.name} className="bg-gray-800 p-2 flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Image src={asset.icon} alt={asset.name} width={24} height={24} className="rounded-full" />
                  <div>
                    <p className="font-medium text-sm text-white">{asset.symbol}</p>
                    <p className="text-xs text-gray-400">${asset.value.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-white">{asset.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{asset.symbol}{(asset.amount * (asset.value / asset.amount)).toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800">
            <Footer />
      </footer>
    </div>
  )
}
