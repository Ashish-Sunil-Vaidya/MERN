import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        
        const data = await response.json();
        console.log(data,response.ok);
        if (!response.ok) {
            setError(data.message)
            setIsLoading(false)
            return;
        }
        if (response.ok) {
            setError(null)
            localStorage.setItem("user", JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
            setIsLoading(false)
        }
    }

    return { error, isLoading, login }
}
