import { useNavigate } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import Loading from "../components/Loading.jsx";

// Home shows a welcome banner and a few featured products
function Home({ products, loading }) {
  const navigate = useNavigate();

  const featured = products.slice(0, 4); // first 4 products as "featured"

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to PastelCart</h1>
        <p>Simple. Clean. Easy shopping for everyone.</p>
        <button className="btn btn-primary" onClick={() => navigate("/products")}>
          Shop Now
        </button>
      </section>

      <section>
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <Loading label="Loading products..." />
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>
    </div>
  );
}

export default Home;
