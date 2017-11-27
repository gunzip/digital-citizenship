/**
 * Run this task to sync Azure Functions staging slot
 * to the source control repository code branch
 * specified in the configuration file.
 * 
 * This is equivalent to push the "Sync" button in the
 * Azure portal -> Functions -> Deployments blade.
 * 
 * This task assumes that the following resources are already created:
 *  - Resource group
 *  - Functions (app service)
 * 
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import webSiteManagementClient = require("azure-arm-website");

export const run = async (config: IResourcesConfiguration) => {
  if (!config.functionapp_git_repo) {
    return Promise.reject(
      "Deployment from source control repository not configured"
    );
  }
  const loginCreds = await login();

  const webSiteClient = new webSiteManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  return webSiteClient.webApps.syncRepositorySlot(
    config.azurerm_resource_group,
    config.azurerm_functionapp,
    config.azurerm_functionapp_slot
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(r => {
    if (r) {
      console.log("Successfully synced functions with source control");
    }
  })
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
