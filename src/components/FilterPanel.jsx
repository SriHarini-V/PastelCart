// FilterPanel is a purely presentational component driven entirely by props
function FilterPanel({
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
}) {
  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <div className="filter-group">
        <label>Minimum Rating</label>
        <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
          <option value={0}>All Ratings</option>
          <option value={3}>3 ★ & above</option>
          <option value={4}>4 ★ & above</option>
          <option value={4.5}>4.5 ★ & above</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;
