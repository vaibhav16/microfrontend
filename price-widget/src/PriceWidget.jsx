import React, { useEffect, useState } from 'react';
import { EventBus } from '../../host-app/src/EventBus';

export default function PriceWidget() {
  const [prices, setPrices] = useState({ BTC: 67200, ETH: 3700 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const newPrices = {
          BTC: parseFloat(prev.BTC) + (Math.random() * 200 - 100),
          ETH: parseFloat(prev.ETH) + (Math.random() * 20 - 10),
        };

        EventBus.publish('priceUpdate', newPrices);

        return newPrices;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>📈 Crypto Prices</div>
      <div style={styles.row}>
        <span style={styles.label}>BTC:</span>
        <span style={{ ...styles.price, color: '#e76f51' }}>${prices.BTC.toFixed(2)}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>ETH:</span>
        <span style={{ ...styles.price, color: '#2a9d8f' }}>${prices.ETH.toFixed(2)}</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #e0e0e0',
    padding: 14,
    borderRadius: 10,
    width: 220,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  header: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#333',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: 500,
    color: '#555',
  },
  price: {
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
  },
};
