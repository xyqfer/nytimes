module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.31.11:3000"
      }
    }
  },
  baseUrl: process.env.VUE_APP_BASE_URL,
  pwa: {
    name: "Poliwag",
    themeColor: "#f7f7f8"
  }
};
