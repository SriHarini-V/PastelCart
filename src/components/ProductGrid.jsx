import ProductCard from "./ProductCard.jsx";

// Simple reusable grid that renders a list of ProductCard components.
// ProductCard now gets addToCart from CartContext, so no prop drilling needed here.
function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="empty-text">No products found. Try changing filters.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
