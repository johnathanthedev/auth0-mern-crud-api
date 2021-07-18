const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Source https://auth0.com/

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkAuth0Jwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_MERN_CRUD_API_INDENTIFIER,
    issuer: [`${process.env.AUTH0_ISSUER}`],
    algorithms: ['RS256']
});

module.exports = checkAuth0Jwt