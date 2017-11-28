// Add signin-signup policy to ADB2C tenant

// Create an App in ADB2C tenant for the developer-portal:
//    name: app-developer-portal-auth
//    returnurl: https://${config.azurerm_apim}.portal.azure-api.net/signin-aad

// Get CLIENT_ID and CLIENT_SECRET

// Configure ADB2C authentication for API management
// apiClient.identityProvider.createOrUpdate()
