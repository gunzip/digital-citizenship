// Configure ADB2C authentication for API management
// apiClient.identityProvider.createOrUpdate()

// tslint:disable:no-console
// tslint:disable:no-any

// tslint:disable

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

// import apiManagementClient = require("azure-arm-apimanagement");
import graphManagementClient = require("azure-graph");

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login({ tokenAudience: "graph" });

  console.log("Create Application for tenant " + config.azurerm_adb2c_tenant);

  const graphClient = new graphManagementClient(
    (loginCreds as any).creds,
    config.azurerm_adb2c_tenant
  );

  const application = await graphClient.applications.create({
    availableToOtherTenants: false,
    displayName: "app-developer-portalx",
    identifierUris: [
      `https://${config.azurerm_adb2c_tenant}/app-developer-portalx`
    ],
    oauth2AllowImplicitFlow: true,
    replyUrls: [
      `https://${config.azurerm_apim}.portal.azure-api.net/signin-aad`
    ]
  });

  console.log(application);

  // const keys = await graphClient.applications.listKeyCredentials(
  //   application.objectId
  // );
  // console.log(keys);
  // }
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() => console.log("successfully linked API management to ADB2C tenant"))
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
