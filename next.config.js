const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  basePath: isProd ? '/scrollrelativity' : '',
  assetPrefix: isProd ? 'https://cdn.statically.io/gh/aruseli/scrollrelativity/gh-pages/' : '',
};