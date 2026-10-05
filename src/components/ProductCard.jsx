import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext.jsx";

// ProductCard receives a single product object as a prop.
// addToCart now comes from CartContext instead of being drilled through props.
function ProductCard({ product }) {
  const { addToCart } = useCartContext();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <h4>{product.name}</h4>
        <p className="product-category">{product.category}</p>
        <p className="product-rating">⭐ {product.rating}</p>
        <p className="product-price">₹{product.price}</p>
      </Link>
      <button className="btn btn-primary" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
