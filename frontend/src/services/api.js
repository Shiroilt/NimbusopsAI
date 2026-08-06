import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false
});

/**
 * Request interceptor to automatically inject JWT tokens.
 */
api.interceptors.request.use(
    (config) => {
        const publicEndpoints = [
            'auth/login/',
            'auth/register/',
            'auth/google/',
            'auth/refresh/'
        ];

        const isPublic = config.url && publicEndpoints.some(endpoint => config.url.includes(endpoint));

        const token = localStorage.getItem("nimbus_access_token");
        if (token && !isPublic) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
};

/**
 * Reusable error handler to normalize backend errors.
 * Includes Silent JWT Refresh logic to intercept 401s and queue waiting requests.
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
            const publicEndpoints = ['auth/login/', 'auth/register/', 'auth/google/', 'auth/refresh/'];
            const isPublic = originalRequest.url && publicEndpoints.some(endpoint => originalRequest.url.includes(endpoint));

            if (!isPublic) {
                if (isRefreshing) {
                    return new Promise(resolve => {
                        subscribeTokenRefresh(token => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshToken = localStorage.getItem('nimbus_refresh_token');
                    if (!refreshToken) {
                        throw new Error("No refresh token available.");
                    }

                    const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('nimbus_access_token', newAccessToken);

                    if (response.data.refresh) {
                        localStorage.setItem('nimbus_refresh_token', response.data.refresh);
                    }

                    window.dispatchEvent(new CustomEvent('nimbus:token_refresh', {
                        detail: { accessToken: newAccessToken }
                    }));

                    onRefreshed(newAccessToken);
                    isRefreshing = false;

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);

                } catch (refreshError) {
                    isRefreshing = false;
                    refreshSubscribers = [];
                    
                    localStorage.removeItem('nimbus_access_token');
                    localStorage.removeItem('nimbus_refresh_token');
                    localStorage.removeItem('nimbus_user');
                    
                    window.dispatchEvent(new Event('nimbus:force_logout'));
                    
                    return Promise.reject(refreshError);
                }
            }
        }

        let errorMessage = "An unexpected error occurred.";

        if (error.response) {
            if (error.response.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (error.response.data.detail) {
                    errorMessage = error.response.data.detail;
                } else {
                    const firstKey = Object.keys(error.response.data)[0];
                    if (firstKey) {
                        const firstError = error.response.data[firstKey];
                        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                    }
                }
            } else {
                errorMessage = `Server Error: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = "Network error. Please check your connection.";
        } else {
            errorMessage = error.message;
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
