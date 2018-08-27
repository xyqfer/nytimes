module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://ibdkopi6vn.avosapps.us"
      }
    }
  },
  baseUrl: process.env.VUE_APP_BASE_URL,
  pwa: {
    name: "nytimes",
    themeColor: "#f7f7f8"
  }
};
