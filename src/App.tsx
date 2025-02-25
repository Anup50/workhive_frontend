import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import PageNotFound from "./shared/PageNotFound";

const PublicLayout = () => {
  const location = useLocation();
  const { role } = useAuth();
  if (role && location.pathname === "/") {
    return <Navigate to="/user" replace />;
  }
  const showNavbar =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
const Home = lazy(() => import("./core/public/Home"));
const SignInPage = lazy(() => import("./core/public/Signin"));
const SignUpPage = lazy(() => import("./core/public/Signup"));
const User = lazy(() => import("./core/private/JobSeeker/Home"));
const Employer = lazy(() => import("./core/private/employer/Index"));
const Search = lazy(() => import("./shared/Search/SearchPage"));
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Toaster />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search/:query" element={<Search />} />
              </Route>

              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Private Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<User />} />
                <Route path="/employer" element={<Employer />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
