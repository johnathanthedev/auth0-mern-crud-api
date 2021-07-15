const router = require("express").Router()

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
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

const checkScopes = jwtAuthz([ 'read:messages' ]);



router.get("/public", (req, res) => {
    // res.json(process.env.AUTH0_DOMAIN)
    res.json({
        message: "PUBLIC ENDPOINT"
    })
})

router.get("/private", checkJwt, (req, res) => {
    res.json("Hitting a private route")
})

router.get("/private-scoped",checkJwt, checkScopes, (req, res) => {
    res.json("Poop hitting /api/private-scoped")
})

module.exports = router