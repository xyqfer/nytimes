const path = process.env.VUE_APP_HOST;
const api = {
  home: `${path}/api/v1/nytimes/home`,
  content: `${path}/api/v1/nytimes/content`,
  category: `${path}/api/v1/nytimes/category`,
  today: `${path}/api/v1/nytimes/today`,
  content2: `${path}/api/v1/nytimes/content2`,
  translate: `${path}/api/v1/nytimes/translate`,
};

export default api;