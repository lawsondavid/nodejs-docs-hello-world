const express = require('express');
const authorizeClientCertificate = require('./clientCertHandler');

const app = express();
const port = process.env.PORT || 1337;

app.get('/', authorizeClientCertificate, (req, res) => res.send('Hello World!!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
