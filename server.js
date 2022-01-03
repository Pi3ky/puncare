const express = require('express');
const path = require('path');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
// Serve only the static files form the dist directory
app.use(express.static('./dist/puncare'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/puncare/'}),
);

app.use(forceSSL());

app.listen(process.env.PORT || 8080);
