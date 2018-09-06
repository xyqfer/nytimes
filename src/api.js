const path = process.env.VUE_APP_HOST;
const api = {
  home: `${path}/api/v1/nytimes/home`,
  content: `${path}/api/v1/nytimes/content`,
  category: `${path}/api/v1/nytimes/category`,
  today: `${path}/api/v1/nytimes/today`,
  content2: `${path}/api/v1/nytimes/content2`,
  translate: `${path}/api/v1/nytimes/translate`,
  te: `${path}/api/v1/nytimes/te`,
  teContent: `${path}/api/v1/nytimes/teContent`,
  te2: `${path}/api/v1/nytimes/te2`,
  teContent2: `${path}/api/v1/nytimes/teContent2`,
  times: `${path}/api/v1/nytimes/times`,
  timesContent: `${path}/api/v1/nytimes/timesContent`,
  wanqu: `${path}/api/v1/nytimes/wanqu`,
  wanquRandom: `${path}/api/v1/nytimes/wanquRandom`,
  crawl: `${path}/api/v1/nytimes/crawl`,
};

export default api;
