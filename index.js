const app = require('./app');
const port = process.env.HEROKU_APP_PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));