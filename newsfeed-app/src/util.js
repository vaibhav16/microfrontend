// filterArticles.js

export function filterArticles(articles) {
  const blockedKeywords = ['fartcoin', 'fart coin', 'fart'];

  return articles.filter(article => {
    const content = `${article.title} ${article.description}`.toLowerCase();
    return !blockedKeywords.some(keyword => content.includes(keyword));
  });
}
