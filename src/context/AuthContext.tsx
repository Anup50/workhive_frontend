import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      if (storedUser && storedToken && storedRole) {
        const parsedRole = storedRole as Role;

        if (["Admin", "User", "Employer"].includes(parsedRole)) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRole(parsedRole);
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

  const isAuthenticated = user !== null && token !== null;

  const login = (user: User, token: string, role: Role) => {
    setUser(user);
    setToken(token);
    setRole(role);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    navigate(
      role === "Admin"
        ? "/admin"
        : role === "Employer"
        ? "/employer-dashboard"
        : "/user"
    );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const value = useMemo(
    () => ({ user, token, role, isAuthenticated, loading, login, logout }),
    [user, token, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
