import React, { Suspense } from 'react';

// const PriceWidget = React.lazy(() => import('price/PriceWidget'));
// const PortfolioWidget = React.lazy(() => import('portfolio/PortfolioWidget'));
// const Wallet = React.lazy(() => import('wallet/Wallet'));
// const NewsFeed = React.lazy(() => import('newsfeed/NewsFeed'));
import Wallet from '../../wallet-app/src/Wallet';
import PortfolioWidget from '../../portfolio-widget/src/PortfolioWidget';
import PriceWidget from '../../price-widget/src/PriceWidget';
import NewsFeed from '../../newsfeed-app/src/NewsFeed';

function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🚀 Crypto Dashboard</h1>
      <div style={styles.grid}>
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <Suspense fallback={<div>Loading Wallet...</div>}>
              <Wallet />
            </Suspense>
          </div>
          <div style={styles.card}>
            <Suspense fallback={<div>Loading Portfolio...</div>}>
              <PortfolioWidget />
            </Suspense>
          </div>
        </div>

        <div style={styles.centerColumn}>
          <div style={styles.card}>
            <Suspense fallback={<div>Loading Price...</div>}>
              <PriceWidget />
            </Suspense>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <Suspense fallback={<div>Loading NewsFeed...</div>}>
              <NewsFeed />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '24px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
  },
  leftColumn: {
    // flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: '280px',
  },
  centerColumn: {
    // flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // minWidth: '260px',
  },
  rightColumn: {
    // flex: '1',
    minWidth: '340px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    padding: '16px',
  },
};

export default App;
