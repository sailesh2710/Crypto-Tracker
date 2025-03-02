// src/components/CryptoCard.tsx
'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Cryptocurrency } from '../types/crypto';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const priceChangeIsPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
        <div>
          <h3 className="font-bold text-lg text-black">{crypto.name}</h3>
          <span className="text-gray-500 uppercase">{crypto.symbol}</span>
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-black">
          ${crypto.current_price.toLocaleString()}
        </div>
        <div className={`flex items-center text-sm ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
          {priceChangeIsPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="ml-1">
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Last updated: {new Date(crypto.last_updated).toLocaleString()}
      </div>
    </div>
  );
};

export default CryptoCard;