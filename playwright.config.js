

const config = {
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};
module.exports = config;

