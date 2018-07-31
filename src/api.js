const path = process.env.VUE_APP_HOST;
const api = {
  home: `${path}/api/v1/nytimes/home`,
  content: `${path}/api/v1/nytimes/content`,
};

export default api;