require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();
const port = process.env.PORT || 3000;

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_REDIRECT_URI,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
};

// Use Auth0's middleware
app.use(auth(config));

// Serve static files (for style.css)
app.use(express.static(__dirname));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Auth0 Universal Login</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Auth0 Universal Login</h1>
        ${req.oidc.isAuthenticated() 
          ? `<h2>Hello, ${req.oidc.user.name}!</h2>
             <a href="/logout" class="btn">Logout</a>`
          : `<h2>Please log in or sign up:</h2>
             <a href="/login" class="btn">Login</a>
             <a href="/signup" class="btn">Sign Up</a>`}
      </div>
    </body>
    </html>
  `);
});

// Custom route for sign-up
app.get('/signup', (req, res) => {
  res.redirect(
    `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${process.env.AUTH0_REDIRECT_URI}&scope=openid%20profile%20email&screen_hint=signup`
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
