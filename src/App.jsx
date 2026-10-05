import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthChoice from "./pages/AuthChoice.jsx";
import Orders from "./pages/Orders.jsx";
import OrdersCurrent from "./pages/OrdersCurrent.jsx";
import OrdersHistory from "./pages/OrdersHistory.jsx";

import useProducts from "./hooks/useProducts.js";
import { useCartContext } from "./context/CartContext.jsx";

function App() {
  // ---------- Products, search & filters ----------
  const {
    products,
    loading,
    error,
    paginatedProducts,
    filteredProducts,
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
  } = useProducts();

  // ---------- Cart (read from Context instead of local state / props) ----------
  const { cartCount } = useCartContext();

  return (
    <div className="app-wrapper">
      <Header cartCount={cartCount} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home products={products} loading={loading} />} />

          <Route
            path="/products"
            element={
              <ProductList
                products={paginatedProducts}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            }
          />

          {/* useParams() reads :id inside ProductDetail */}
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          <Route path="/auth" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Nested routes: Orders is a layout with an <Outlet /> for its children */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="current" replace />} />
            <Route path="current" element={<OrdersCurrent />} />
            <Route path="history" element={<OrdersHistory />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
