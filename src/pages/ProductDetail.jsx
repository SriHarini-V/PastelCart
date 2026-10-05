import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext.jsx";
import Loading from "../components/Loading.jsx";

const API_URL = "https://fakestoreapi.com/products";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    let ignore = false;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error(`Product request failed: ${response.status}`);
        }

        const item = await response.json();

        if (!ignore) {
          setProduct({
            id: item.id,
            name: item.title,
            category: item.category,
            brand: "API Store",
            price: Number(item.price),
            rating: Number(item.rating?.rate || 0),
            image: item.image,
            description: item.description,
          });
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load product details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <Loading label="Loading product details..." fullPage />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <p className="empty-text">
          {error || "Product not found."}
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="detail-image" />

        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="product-category">{product.category}</p>
          <p className="product-rating">⭐ {product.rating} / 5</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">₹{product.price}</p>

          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
