import type {LoginRequestDto} from "../../features/auth/models/LoginRequestDto";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useLogin} from "../../features/auth/hooks/useLogin";
import {useCurrentUser} from "../../features/auth/hooks/useCurrentUser";
import {useNavigate} from "react-router-dom";
import {User} from "../../features/auth/models/User";
import {RegisterRequestDto} from "../../features/auth/models/RegisterRequestDto";
import {useRegister} from "../../features/auth/hooks/useRegister";

type AuthContextType = {
    user: User | null
    token: string | null;
    login: (data: LoginRequestDto) => Promise<void>;
    register: (data: RegisterRequestDto) => Promise<void>
    logout: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const { token, setToken, removeToken } = useLocalStorage()
    const { mutateAsync: loginMutation } = useLogin();
    const { mutateAsync: registerMutation} = useRegister()
    const { refetch } = useCurrentUser();
    const navigate = useNavigate()


    useEffect(() => {
        if (token) {
            refetch().then(res => {
                setUser(res.data ?? null);
            }).catch(() => {
                setUser(null);
                removeToken();
            });
        } else {
            setUser(null);
        }
    }, [token]);

    const register = async (data: RegisterRequestDto) => {
        try {
            const res = await registerMutation(data);
            console.log(res.fullName)

           // navigate("/");
        } catch (err) {
            console.error("Erreur login :", err);
        }
    }

    const login = async (data: LoginRequestDto) => {
        try {
            const res = await loginMutation(data);
            setToken(res.token);
            // refetch pour récupérer l'user après login
            const userRes = await refetch();
            setUser(userRes.data ?? null);
            navigate("/");
        } catch (err) {
            console.error("Erreur login :", err);
        }
    };

    const logout = async () => {
        setToken("")
        navigate("auth/login");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside <AuthProvider />");
    return context;
}