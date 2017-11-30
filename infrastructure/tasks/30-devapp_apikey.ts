/**
 * Run this task from the command line to create
 * a new API management user that has the rights to 
 * create a new Service (through Admin API) and to send
 * a new Message (through Digital Citizenship API).
 * 
 * This lets the developer portal facilities web application
 * create or update API gateway users.
 *
 * https://github.com/teamdigitale/digital-citizenship-onboarding
 *
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { ICreds, login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";
import { checkEnvironment } from "../../lib/environment";

import { IUserData, updateApimUser } from "../../lib/apim_user";
import { createOrUpdateService } from "../../lib/service";

import apiManagementClient = require("azure-arm-apimanagement");
import webSiteManagementClient = require("azure-arm-website");

const createOrUpdareAdminApiUser = async (
  config: IResourcesConfiguration,
  loginCreds: ICreds
) => {
  const userData: IUserData = {
    email: config.apim_admin_email,
    firstName: "AzureDevPortal",
    groups: [
      "ApiProfileWrite",
      "ApiMessageWrite",
      "ApiMessageRead",
      "ApiServiceWrite",
      "ApiServiceRead"
    ],
    lastName: "Deploy",
    oid: "azure-deploy",
    productName: config.apim_admin_product
  };

  const apiClient = new apiManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  // Create or update user in API management
  const user = await apiClient.user.createOrUpdate(
    config.azurerm_resource_group,
    config.azurerm_apim,
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

  // Add user to product in API management
  const subscription = await updateApimUser(
    user.name,
    userData,
    apiClient,
    config
  );

  if (!subscription || !subscription.name) {
    throw new Error("Cannot create subscription");
  }

  // Save a service related to the user subscription
  await createOrUpdateService(
    subscription.primaryKey,
    {
      authorized_cidrs: [],
      authorized_recipients: [],
      department_name: "IT",
      organization_name: "AgID",
      service_id: subscription.name,
      service_name: "Digital Citizenship"
    },
    `https://${config.azurerm_apim}.azure-api.net`
  );

  return subscription;
};

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const subscription = await createOrUpdareAdminApiUser(config, loginCreds);

  const webSiteClient = new webSiteManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  const appSettings = await webSiteClient.webApps.listApplicationSettings(
    config.azurerm_resource_group,
    config.azurerm_app_service_portal
  );

  // Set up ADMIN_API_KEY variable in application settings
  if (appSettings.properties) {
    await webSiteClient.webApps.updateApplicationSettings(
      config.azurerm_resource_group,
      config.azurerm_app_service_portal,
      {
        properties: {
          ...appSettings.properties,
          ADMIN_API_KEY: subscription.primaryKey
        }
      }
    );
  }
};

checkEnvironment()
  .then(() => readConfig(process.env.ENVIRONMENT))
  .then(run)
  .then(r => {
    if (r) {
      console.log("Successfully set up developer portal ADMIN_API_KEY");
    }
  })
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
