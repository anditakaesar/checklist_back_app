const STATICVARS = {
    JWT_SECRET: process.env.JWT_SECRET || 'test_a_secret',
    COOKIES_SECRET: process.env.COOKIES_SECRET || 'A_TEST_SECRET',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/CheckListApp'
};

module.exports = STATICVARS;