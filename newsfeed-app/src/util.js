


export function filterArticles(articles) {
  const blockedKeywords = ['fartcoin', 'fart coin', 'fart'];

  return articles.filter(article => {
    const content = `${article.title} ${article.description}`.toLowerCase();
    return !blockedKeywords.some(keyword => content.includes(keyword));
  });
}

export const fallbackArticles = [
  {
    title: 'Bitcoin Hits New High Amid Market Frenzy',
    url: 'https://example.com/crypto-news',
    source: { name: 'Crypto Daily' },
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Ethereum 2.0 Launch Expected to Boost Network Efficiency',
    url: 'https://example.com/eth-news',
    source: { name: 'Blockchain Times' },
    publishedAt: new Date().toISOString(),
  },
];


export const API_KEY = import.meta.env.VITE_API_KEY;