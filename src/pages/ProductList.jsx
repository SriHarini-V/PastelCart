import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Loading from "../components/Loading.jsx";

function ProductList({
  products,
  loading,
  error,
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  categories,
  brand,
  setBrand,
  brands,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="product-list-page">
      <h2 className="section-title">All Products</h2>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="product-list-layout">
        <FilterPanel
          category={category}
          setCategory={setCategory}
          categories={categories}
          brand={brand}
          setBrand={setBrand}
          brands={brands}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <div className="product-list-results">
          {loading ? (
            <Loading label="Fetching products from REST API..." />
          ) : error ? (
            <div className="api-error">
              <p>Unable to load products.</p>
              <small>{error}</small>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />

              {products.length > 0 && totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
