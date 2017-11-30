/**
 * Run this task from the command line to sync the source code
 * from the GitHub repository to the Azure App Service
 * running the developer portal onboarding facilities:
 * 
 * https://github.com/teamdigitale/digital-citizenship-onboarding
 *  
 * This task assumes that the following resources are already created:
 *  - Resource group
 *  - App Service Plan
 *  - App Service
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import webSiteManagementClient = require("azure-arm-website");

export const run = async (config: IResourcesConfiguration) => {
  if (!config.app_service_portal_git_repo) {
    return Promise.reject(
      "Deployment from source control repository not configured, skipping."
    );
  }
  const loginCreds = await login();

  const webSiteClient = new webSiteManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  // Sync git to app service
  return webSiteClient.webApps.syncRepository(
    config.azurerm_resource_group,
    config.azurerm_app_service_portal
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(r => {
    if (r) {
      console.log(
        "Successfully synced developer portal webapp with source control"
      );
    }
  })
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
