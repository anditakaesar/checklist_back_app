const STATICVARS = {
    JWT_SECRET: process.env.JWT_SECRET || 'test_a_secret',
    JWT_EXPSEC: process.env.JWT_EXPSEC || 24 * 3600,
    COOKIES_SECRET: process.env.COOKIES_SECRET || 'A_TEST_SECRET',
    COOKIES_HEADERNAME: process.env.COOKIES_HEADERNAME || 'expressTest.sess',
    COOKIES_MAXAGESEC: process.env.COOKIES_MAXAGESEC || 1000 * 60 * 15,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/CheckListApp'
};

module.exports = STATICVARS;