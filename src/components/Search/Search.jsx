import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (!query) return;

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/prod/search`, 
        { params: { q: query } }  // Important: Send as URL params
      );
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchResults();
}, [query]);

  

  return (
    <div className="search-page">
      <h1>Search Results for: {query}</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No results found for "{query}"</p>
      )}
    </div>
  );
}