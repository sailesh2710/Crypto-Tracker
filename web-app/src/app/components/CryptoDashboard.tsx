// src/components/CryptoDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { fetchCryptocurrencies } from '../services/api';
import CryptoCard from './CryptoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { Cryptocurrency } from '../types/crypto';

const CryptoDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const queryClient = useQueryClient();

  const queryOptions: UseQueryOptions<Cryptocurrency[], Error, Cryptocurrency[], string[]> = {
    queryKey: ['cryptocurrencies'],
    queryFn: fetchCryptocurrencies,
    staleTime: 0,
  };

  const { data: cryptos, isLoading, isError, error, refetch } = useQuery(queryOptions);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setMinLoadingTime(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMinLoadingTime(true);
    }
  }, [isLoading]);

  const filteredCryptos = cryptos
    ?.filter((crypto: Cryptocurrency) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleRefresh = async () => {
    setShowToast(true);
    await refetch();
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (isError) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 text-lg">
          Error loading data: {(error as Error).message}
        </p>
        <button onClick={handleRefresh} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={handleRefresh}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {(isLoading || minLoadingTime) ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCryptos && filteredCryptos.length > 0 ? (
              filteredCryptos.map((crypto: Cryptocurrency) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))
            ) : (
              <div className="col-span-full text-center p-4">
                <p>No cryptocurrencies found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast notification at the bottom right */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">
  Prices refreshed!
</div>
        </div>
      )}
    </>
  );
};

export default CryptoDashboard;