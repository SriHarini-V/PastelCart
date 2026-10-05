import { useRef, useEffect } from "react";

// SearchBar is a controlled input; searchTerm and setSearchTerm come from props
function SearchBar({ searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);

  // useRef + useEffect: automatically focus the search box when this component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
