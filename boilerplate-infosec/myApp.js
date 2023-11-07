var ninetyDaysInSeconds = 90*24*60*60;
const express = require('express');
// express in myApp.js
const app = express();
const helmet = require('helmet');
const bcrypt = require('bcrypt');
// helmet in myApp.js

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
// app.use(helmet.hidePoweredBy())
// Use helmet.frameguard() passing with the configuration object {action: 'deny'}. Prevents frame or iframe hijack attacks
// app.use(helmet.frameguard({action: 'deny'}))

// Use helmet.xssFilter() to sanitize input sent to your server. Prevents cross scripting attacks.
// app.use(helmet.xssFilter())

// Use the helmet.noSniff() method on your server. Prevents content type locating, changing and overriding.
// app.use(helmet.noSniff())

// Use the helmet.ieNoOpen() method on your server. IE only prevents users from executing downloads on site.
// app.use(helmet.ieNoOpen())

// Configure helmet.hsts() to use HTTPS for the next 90 days. Pass the config object {maxAge: timeInSeconds, force: true}. You can create a variable ninetyDaysInSeconds = 90*24*60*60; to use for the timeInSeconds. Replit already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Replit header, after inspecting it for testing. Avoids http if https available.
// app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))

// Use the helmet.dnsPrefetchControl() method on your server. Disables DNS prefetching.
// app.use(helmet.dnsPrefetchControl())

// Use the helmet.noCache() method on your server. Disables caching.
// app.use(helmet.noCache())

// In this exercise, use helmet.contentSecurityPolicy(). Configure it by adding a directives object. In the object, set the defaultSrc to ["'self'"] (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the scriptSrc directive so that you only allow scripts to be downloaded from your website ('self'), and from the domain 'trusted-cdn.com'.

// Hint: in the 'self' keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working.
// app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"], scriptSrc: ["'self'", 'trusted-cdn.com']}}));

// app.use(helmet()) will automatically include all the middleware introduced above, except noCache(), and contentSecurityPolicy(), but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))


app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
