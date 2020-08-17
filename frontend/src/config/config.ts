const ENVIRONMENT = process.env.ENVIRONMENT || 'LOCAL';
const BACKEND_PORT = 4001
let config = {
    ENVIRONMENT: ENVIRONMENT,
    URLS: {
        KARAOKEMP_BACKEND: (ENVIRONMENT =='LOCAL')? `localhost:${BACKEND_PORT}`:`backend:${BACKEND_PORT}` 
    }
}
export default config;
