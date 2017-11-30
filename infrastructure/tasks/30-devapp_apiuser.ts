// tslint:disable:no-console
// tslint:disable:no-any

// Create an API management user (with script from onboarding)
// Get API_KEY of the APIm user
// set API_KEY in the onboarding application settings
// ADMIN_API_KEY=xxxxxxxxxxx

/**
 * This is a command line script that you can run to create
 * a new API management user that has the rights to 
 * create a new service (through Admin API) and to send
 * a new message (throught Digital Citizenship API).
 *
 * Once created, the API-Key for the user subscription will be written 
 * to standard output.
 *
 */
import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import { IUserData, updateApimUser } from "../account";
import { createService } from "../service";

import apiManagementClient = require("azure-arm-apimanagement");

const createAdminUser = async (configx, apiClient) => {
  const userData: IUserData = {
    email: "apim-deploy@agid.gov.it",
    firstName: "azure",
    groups: [
      "ApiProfileWrite",
      "ApiMessageWrite",
      "ApiMessageRead",
      "ApiServiceWrite",
      "ApiServiceRead"
    ],
    lastName: "deploy",
    oid: "azure-deploy",
    productName: config.apimProductName
  };

  const user = await apiClient.user.createOrUpdate(
    config.azurermResourceGroup,
    config.azurermApim,
    userData.oid,
    {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    }
  );

  if (!user || !user.name) {
    throw new Error("Cannot create new user");
  }

  const subscription = await updateApimUser(user.name, userData, creds, true);

  if (!subscription || !subscription.name) {
    throw new Error("Cannot create subscription");
  }

  await createService(subscription.primaryKey, {
    authorized_cidrs: [],
    authorized_recipients: [],
    department_name: "IT",
    organization_name: "AgID",
    service_id: subscription.name,
    service_name: "Digital Citizenship"
  });

  return subscription.primaryKey;
};

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  await createAdminUser(config, apiClient);
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(r => {
    if (r) {
      console.log("Successfully set up developer portal API_KEY");
    }
  })
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));

// createAdminUser(localConfig)
//   .then(key => console.log("set ADMIN_API_KEY=" + key))
//   .catch(console.error);
