import React, { useState, useEffect } from 'react';
import { filterArticles, fallbackArticles, API_KEY } from './util';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`
      );
      const json = await res.json();
      if (json.status === 'ok') {
        const tempArticles = filterArticles(json.articles);
        setArticles(tempArticles.length ? tempArticles : fallbackArticles); // ✅ Use fallback if empty
      } else {
        console.error('NewsAPI error:', json);
        setArticles(fallbackArticles); // ✅ Fallback on API error
      }
    } catch (err) {
      console.error('Failed to fetch live news:', err);
      setArticles(fallbackArticles); // ✅ Fallback on fetch error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const fetchInterval = setInterval(fetchNews, 60000); // refresh news every 1 min
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setCurrent(prev => (prev + 1) % articles.length);
    }, 3000); // rotate every 3 seconds

    return () => clearInterval(rotateInterval);
  }, [articles]);

  if (loading || articles.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>📰 Live Crypto News</h2>
        <div style={styles.loading}>Loading news...</div>
      </div>
    );
  }

  const currentArticle = articles[current];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📰 Live Crypto News</h2>
      <div style={styles.articleBox}>
        <a href={currentArticle.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
          <strong>📝 {currentArticle.title}</strong>
        </a>
        <div style={styles.source}>
          {currentArticle.source.name} · {new Date(currentArticle.publishedAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f4f8',
    width: 350,
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    marginBottom: 10,
    fontSize: 18,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#777',
  },
  articleBox: {
    transition: 'opacity 0.5s ease',
  },
  link: {
    textDecoration: 'none',
    color: '#1a1a1a',
    fontSize: 16,
  },
  source: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
};

export default NewsFeed;
