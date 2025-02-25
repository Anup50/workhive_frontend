import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

const PublicLayout = () => {
  const location = useLocation();
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
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
