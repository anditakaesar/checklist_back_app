const app = require('./app');
const port = process.env.OPENSHIFT_NJS_PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));