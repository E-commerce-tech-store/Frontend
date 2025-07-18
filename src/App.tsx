import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import './App.css';

// Layout component that conditionally renders the header based on route
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={`relative ${isAdminRoute ? '' : 'grid gap-4'}`}>
        <div className="fixed -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none z-0" />
        <div className="fixed -bottom-40 -right-40 w-[34rem] h-[34rem] bg-violet-200/40 rounded-full blur-[100px] opacity-40 animate-pulse pointer-events-none z-0" />
        {children}
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <>
                  <HeroSection />
                  <ProductGrid />
                </>
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/orders"
            element={
              <Layout>
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/admin/products"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />

          <Route
            path="/admin/users"
            element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              </Layout>
            }
          />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            position: 'bottom-center'
          }}
        />
      </Router>
    </AuthProvider>
  );
}
