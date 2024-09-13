import { useState } from "react";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async () => {
    if (username && password) {
      setIsLoading(true);
      setError("");

      const minLoadingTime = 1500;
      const startTime = Date.now();

      try {
        const response = await fetch(
          "https://backend-hackaton-production-f38b.up.railway.app/v1/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          const userInfoData = await fetchUserInfo(data.token);

          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < minLoadingTime) {
            await new Promise((resolve) =>
              setTimeout(resolve, minLoadingTime - elapsedTime)
            );
          }

          setUserInfo(userInfoData);
          return { token: data.token, userInfo: userInfoData };
        } else {
          setError("Credenciales inválidas");
        }
      } catch (error) {
        setError("Error en el inicio de sesión");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Por favor, ingrese tanto el usuario como la contraseña");
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://backend-hackaton-production-f38b.up.railway.app/v1/api/auth/info-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener información del usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud de información del usuario", error);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    userInfo,
    handleLogin,
  };
};

export default useLogin;