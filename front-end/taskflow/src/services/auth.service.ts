import api from "./api";
import { jwtDecode } from "jwt-decode";

interface LoginData {
  email: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  userId: number;
}

export const login = async ({ email, password }: LoginData) => {
  const response = await api.post("/auth/login", { email, password });
  const token = response.data.token;

  localStorage.setItem("token", token);
  return token;
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Verifica se o usuário está logado
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return false;
  }
};

export const getToken = () => localStorage.getItem("token");
