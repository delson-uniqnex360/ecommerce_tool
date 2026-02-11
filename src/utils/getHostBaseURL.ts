const getBackendHostBaseURL = (): string => {
    const env: string = import.meta.env.VITE_ENVIRONMENT;

    if (env === "development") {
        return import.meta.env.VITE_DEV_BACKEND_BASE_URL;
    }
    else {
        return ""
    }
}

export default getBackendHostBaseURL;