const preference = {
  'nyt-cn': {
    api: 'content',
    cache: true,
  },
  'nyt': {
    api: 'content2',
    cache: true,
  },
  'te-cn': {
    api: 'teContent',
    cache: true,
  },
  'te': {
    api: 'teContent2',
    cache: false,
  },
  'times': {
    api: 'timesContent',
    cache: true,
  },
  'wanqu': {
    api: 'crawl',
    cache: true,
    raw: true,
  },
  'i21st': {
    api: 'i21stContent',
    cache: true,
  },
};

export default preference;
