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

import UserNavbar from "./core/private/JobSeeker/UserNabbar";
import EmployerNavbar from "./core/private/employer/EmployerNavbar";

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
// const PrivateLayout = () => {
//   const location = useLocation();
//   const { role } = useAuth();

//   // Check if user is on a private route (starts with /user or /employer)
//   const showUserNavbar = location.pathname.startsWith("/user");

//   return (
//     <>
//       {showUserNavbar && <UserNavbar />}
//       <Outlet />
//     </>
//   );
// };
const PrivateLayout = () => {
  const location = useLocation();

  // Determine which navbar to show
  const showUserNavbar =
    location.pathname.startsWith("/user") && location.pathname !== "/user/form";

  const showEmployerNavbar =
    location.pathname.startsWith("/employer") &&
    !location.pathname.startsWith("/employer/form");

  return (
    <>
      {showUserNavbar && <UserNavbar />}
      {showEmployerNavbar && <EmployerNavbar />}
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
const EmployerPage = lazy(() => import("./core/public/EmployerProfile"));
const User = lazy(() => import("./core/private/JobSeeker/Home"));
const Employer = lazy(() => import("./core/private/employer/Index"));
const JobseekerForm = lazy(
  () => import("./core/private/JobSeeker/JobseekerForm")
);
const EmployerForm = lazy(
  () => import("./core/private/employer/EmployerRegister")
);
const JobForm = lazy(() => import("./core/private/employer/JobForms"));
const UserSearch = lazy(() => import("./core/private/JobSeeker/UserSearch"));
const Search = lazy(() => import("./shared/Search/SearchPage"));
const ViewJobs = lazy(() => import("./core/public/ViewJobs"));
const UserViewJobs = lazy(
  () => import("./core/private/JobSeeker/UserViewJobs")
);

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
                <Route
                  path="/employer/:employerId"
                  element={<EmployerPage />}
                />
                {/* <Route path="/job/" element={<ViewJobs />} /> */}
                <Route path="/job/:id" element={<ViewJobs />} />
              </Route>

              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Private Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                  <Route path="/user" element={<User />} />
                  <Route path="/user/form" element={<JobseekerForm />} />
                  <Route path="/user/job/:id" element={<UserViewJobs />} />

                  <Route path="/user/search/:query" element={<UserSearch />} />
                  <Route path="/employer" element={<Employer />} />
                  <Route path="/employer/form" element={<EmployerForm />} />
                  <Route path="/employer/add" element={<JobForm />} />
                </Route>
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
