module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  baseUrl: process.env.VUE_APP_BASE_URL,
  pwa: {
    name: "Poliwag",
    themeColor: "#f7f7f8"
  }
};
