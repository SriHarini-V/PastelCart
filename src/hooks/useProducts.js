import { useState, useEffect, useMemo } from "react";

const API_URL = "https://fakestoreapi.com/products";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          const mappedProducts = data.map((item) => ({
            id: item.id,
            name: item.title,
            category: item.category,
            brand: "API Store",
            price: Number(item.price),
            rating: Number(item.rating?.rate || 0),
            image: item.image,
            description: item.description,
          }));

          setProducts(mappedProducts);
          setMaxPrice(
            Math.ceil(Math.max(...mappedProducts.map((p) => p.price), 100))
          );
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to fetch products.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...unique];
  }, [products]);

  const brands = useMemo(() => {
    const unique = new Set(products.map((p) => p.brand));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search);

      const matchesCategory = category === "All" || p.category === category;
      const matchesBrand = brand === "All" || p.brand === brand;
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sortOption === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    products,
    searchTerm,
    category,
    brand,
    maxPrice,
    minRating,
    sortOption,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, brand, maxPrice, minRating, sortOption]);

  return {
    products,
    loading,
    error,
    filteredProducts,
    paginatedProducts,
    categories,
    brands,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    brand,
    setBrand,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}

export default useProducts;
