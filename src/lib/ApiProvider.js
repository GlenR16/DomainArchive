import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUsername } from "../contexts/UsernameProvider";


const useAxiosAuth = () => {
    const { clearUsername } = useUsername();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem("accessToken");
	const api = axios.create({
		baseURL: import.meta.env.VITE_BACKEND_URL,
		headers: {
			"Content-Type": "application/json",
			Authorization: accessToken ? `Bearer ${accessToken}`: null,
		},
	});

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use((config) => {
			if (!config.headers.Authorization && accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		});

		const responseInterceptor = api.interceptors.response.use(
			(response) => response,
			(error) => {
				const config = error.config;
				if (error?.response?.status === 403 && !config.sent) {
					config.sent = true;
					api.post("/token/refresh", {
						refresh: localStorage.getItem("refreshToken"),
					})
						.then((response) => {
							localStorage.setItem("accessToken", response.data.access);
							config.headers.Authorization = `Bearer ${response.data.access}`;
							return api(config);
						})
						.catch((error) => {
                            clearUsername();
							localStorage.removeItem("accessToken");
							localStorage.removeItem("refreshToken");
							navigate("/login");
						});
				}

				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	});
	return api;
};

export default useAxiosAuth;
