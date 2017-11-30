/**
 * Configure ADB2C authentication for API management
 */

// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import apiManagementClient = require("azure-arm-apimanagement");

const adb2cClientId = process.env.DEV_PORTAL_CLIENT_ID;
const adb2cClientSecret = process.env.DEV_PORTAL_CLIENT_SECRET;

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  return apiClient.identityProvider.createOrUpdate(
    config.azurerm_resource_group,
    config.azurerm_apim,
    "aadB2C",
    {
      allowedTenants: [config.azurerm_adb2c_tenant],
      clientId: adb2cClientId,
      clientSecret: adb2cClientSecret,
      identityProviderContractType: "aadB2C",
      signinPolicyName: config.azurerm_adb2c_policy,
      signupPolicyName: config.azurerm_adb2c_policy
    }
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() => console.log("successfully linked API management to ADB2C tenant"))
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
