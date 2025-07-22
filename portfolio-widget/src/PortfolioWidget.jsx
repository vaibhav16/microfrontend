import React, { useEffect, useState } from 'react';

export default function PortfolioWidget() {
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0 });

  const holdings = [
    { token: 'BTC', amount: 0.5 },
    { token: 'ETH', amount: 5 },
  ];

  useEffect(() => {
    let unsubscribeFn = null;

    import('host/eventBus').then((mod) => {
      const { EventBus } = mod.default;

      if (!EventBus) {
        console.error('EventBus is undefined');
        return;
      }

      const handlePriceUpdate = (newPrices) => {
        setPrices(newPrices);
      };

      EventBus.subscribe('priceUpdate', handlePriceUpdate);
      unsubscribeFn = () => EventBus.unsubscribe('priceUpdate', handlePriceUpdate);
    });

    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, []);

  const holdingsWithValue = holdings.map(h => ({
    ...h,
    value: (prices[h.token] || 0) * h.amount,
  }));

  const total = holdingsWithValue.reduce((sum, h) => sum + h.value, 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h3>📊 Portfolio Summary</h3>
      {holdingsWithValue.map(h => (
        <p key={h.token}>
          {h.token}: {h.amount} @ ${prices[h.token]?.toFixed(2) || '0.00'} → ${h.value.toFixed(2)}
        </p>
      ))}
      <strong>Total Value: ${total}</strong>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#fafafa',
  },
};
