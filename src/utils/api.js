const path = process.env.VUE_APP_HOST;
const api = {};

[
  "nyt-cn",
  "nyt-category",
  "nyt-today",
  "nyt-book",
  "te-gbr",
  "te-today",
  "te-magazine",
  "chat",
  "wanqu",
  "wanqu-hot",
  "wanqu-random",
  "i21st",
  "subtitle",
  "times",
  "translate",
  "content"
].forEach(key => {
  api[key] = `${path}/api/v1/poliwag/${key}`;
});

export default api;
