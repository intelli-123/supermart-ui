// In production the Angular app is served by nginx which reverse-proxies
// /api/* to the backend Cloud Run service. Using a relative path means
// the frontend works regardless of which hostname it is deployed to.
export const environment = {
  production: true,
  apiUrl: '/api'
};
