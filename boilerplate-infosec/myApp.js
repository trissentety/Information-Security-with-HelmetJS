const express = require('express');
// express in myApp.js
const app = express();
const helmet = require('helmet');
// helmet in myApp.js
















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.use(helmet.hidePoweredBy())
// Use helmet.frameguard() passing with the configuration object {action: 'deny'}. Prevents frame or iframe hijack attacks
app.use(helmet.frameguard({action: 'deny'}))

// Use helmet.xssFilter() to sanitize input sent to your server. Prevents cross scripting attacks.
app.use(helmet.xssFilter())

// Use the helmet.noSniff() method on your server. Prevents content type locating, changing and overriding.
app.use(helmet.noSniff())

// Use the helmet.ieNoOpen() method on your server. IE only prevents users from executing downloads on site.
app.use(helmet.ieNoOpen())

app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
