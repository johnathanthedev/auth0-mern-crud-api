const jwtAuthz = require('express-jwt-authz');

const checkAuth0Permissions = jwtAuthz(["read:admin"], {
    customScopeKey: "permissions",
    // If you want to check for all permissions
    // By default, only one permission has to be met to access route
    // checkAllScopes: true
})

module.exports = checkAuth0Permissions