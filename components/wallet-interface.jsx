'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FaBars, FaPaperPlane, FaDownload, FaSyncAlt, FaHistory, FaLifeRing, FaWallet, FaCog, FaLiraSign, FaPoundSign, FaDollarSign, FaEuroSign, } from 'react-icons/fa'
import Image from 'next/image'
import Naira from '../public/icons//naira-sign.png';
import Dollar from '../public/icons/dollar.png';
import Cedi from '../public/icons/cedi.png';
import Kenyan from '../public/icons/shilling-shilling.png';
import Euro from '../public/icons/euro.png';
import  Link  from 'next/link';
import { Footer } from '@/components/footer';
import Header from './Header';
import Horizontal from './vertical';

export function WalletInterface() {
  const [id, setId] = useState('');
  const [balance, setBalance] = useState(100)
  const [assets, setAssets] = useState([
    { name: 'Nigerian Naira', amount: 0, value: 0.0, icon: Naira, symbol: 'Naira', sym: '₦' },
    { name: 'Ghanaian Cedi', amount: 0, value: 0.0, icon: Cedi, symbol: 'Ghana Cedi', sym: '₵' },
    { name: 'Kenyan Shilling', amount: 0, value: 0.0, icon: Kenyan, symbol: 'Kenyan Shilling', sym: 'KSh'},
    { name: 'US Dollar', amount: 0, value: 0.0, icon: Dollar, symbol: 'Dollar', sym:'$' },
    { name: 'Euro', amount: 0, value: 0, icon: Euro, symbol: 'Euro', sym: '£'},
  ]);

  useEffect(() => {
    // Extract customer_id from the query string
    const searchParams = new URLSearchParams(window.location.search);
    const customer_id = searchParams.get('customer_id');
    
    if (customer_id) {
      setId(customer_id); // Set the customer_id to the state
    }
  }, []);


  return (
    <>
    <Header />
    <div className="w-[360px] h-[640px] bg-gray-900 text-white flex flex-col mt-7">      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">$1,000,000</h1>
          <p className="text-gray-400 text-xs">Available Balance <span className="text-gray-500">ⓘ</span></p>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <Link href={`/pages/send`}>
            <Button variant="outline" className="flex flex-col items-center p-2 bg-gray-800 hover:bg-gray-700">
              <FaPaperPlane className="w-20 h-20 mb-1" />
              <span className="text-xs">Send</span>

            </Button>
          </Link>

          <Button variant="outline" className="flex flex-col items-center p-2 bg-gray-800 hover:bg-gray-700">
            <FaDownload className="w-20 h-20 mb-1" />
            <Link href={`/pages/receive`}>
              <span className="text-">Receive</span>
            </Link>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col px-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Available Currencies</h2>
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
                  </div>
                </div>

              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
   
    <footer className="bg-gray-800">
        <Footer />
      </footer>
    </>
  )
}