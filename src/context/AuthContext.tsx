import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getEmployerId, getJobSeekerId } from "../Api"; // Ensure these endpoints exist

interface User {
  id: string;
  name: string;
  email: string;
}

type Role = "Admin" | "User" | "Employer";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  jobSeekerId: string | null; // For jobseekers (role "User")
  employerId: string | null; // For employers (role "Employer")
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [jobSeekerId, setJobSeekerId] = useState<string | null>(null);
  const [employerId, setEmployerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load stored auth data from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      const storedJobSeekerId = localStorage.getItem("jobSeekerId");
      const storedEmployerId = localStorage.getItem("employerId");

      if (storedUser && storedToken && storedRole) {
        const parsedRole = storedRole as Role;
        if (["Admin", "User", "Employer"].includes(parsedRole)) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRole(parsedRole);
          if (parsedRole === "User" && storedJobSeekerId) {
            setJobSeekerId(storedJobSeekerId);
          }
          if (parsedRole === "Employer" && storedEmployerId) {
            setEmployerId(storedEmployerId);
          }
        } else {
          localStorage.removeItem("role");
        }
      }
    } catch (error) {
      console.error("Failed to load auth data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch jobseekerId if the role is "User" and token is available
  useEffect(() => {
    const fetchJobSeekerId = async () => {
      try {
        const response = await getJobSeekerId();
        if (response && response.data) {
          const id = response.data.jobSeekerId;
          setJobSeekerId(id);
          localStorage.setItem("jobSeekerId", id);
        }
      } catch (error) {
        console.error("Error fetching jobseekerId:", error);
      }
    };

    if (token && role === "User" && !jobSeekerId) {
      fetchJobSeekerId();
    }
  }, [token, role, jobSeekerId]);

  // Fetch employerId if the role is "Employer" and token is available
  useEffect(() => {
    const fetchEmployerId = async () => {
      try {
        const response = await getEmployerId();
        if (response && response.data) {
          const id = response.data.employerId;
          setEmployerId(id);
          localStorage.setItem("employerId", id);
        }
      } catch (error) {
        console.error("Error fetching employerId:", error);
      }
    };

    if (token && role === "Employer" && !employerId) {
      fetchEmployerId();
    }
  }, [token, role, employerId]);

  const isAuthenticated = user !== null && token !== null;

  const login = (user: User, token: string, role: Role) => {
    setUser(user);
    setToken(token);
    setRole(role);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Remove any old role-specific ids (we'll fetch fresh ones)
    localStorage.removeItem("jobSeekerId");
    localStorage.removeItem("employerId");

    navigate(
      role === "Admin" ? "/admin" : role === "Employer" ? "/employer" : "/user"
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setJobSeekerId(null);
    setEmployerId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("jobSeekerId");
    localStorage.removeItem("employerId");
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      jobSeekerId,
      employerId,
      isAuthenticated,
      loading,
      login,
      logout,
    }),
    [user, token, role, jobSeekerId, employerId, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
