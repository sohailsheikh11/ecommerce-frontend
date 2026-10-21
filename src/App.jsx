import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar'
import Footer from './components/Footer'
import Header from './components/Header'
import { RequireAuth } from './components/ui'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import AuthPage from './pages/AuthPage'
import Cart from './pages/Cart'
import Landing from './pages/Landing'
import Orders from './pages/Orders'
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop'

// Scroll to #anchor on navigation, otherwise to top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait a tick so the target section has rendered
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollManager />
            <AnnouncementBar />
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-6">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<AuthPage mode="login" />} />
                <Route path="/register" element={<AuthPage mode="register" />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/orders"
                  element={
                    <RequireAuth>
                      <Orders />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<p className="py-16 text-center">Page not found.</p>} />
              </Routes>
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
