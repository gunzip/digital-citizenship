/**
 * Run this task from the command line to set up deployment
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

  const siteSourceControl = {
    branch: config.app_service_portal_git_branch,
    deploymentRollbackEnabled: true,
    // FIXME: setting `isManualIntegration: false` will fail trying to send an email
    // to the service principal user. I guess this is a bug in the Azure APIs
    isManualIntegration: true,
    isMercurial: false,
    repoUrl: config.app_service_portal_git_repo,
    type: config.app_service_portal_scm_type
  };

  // Create git integration
  return webSiteClient.webApps.createOrUpdateSourceControl(
    config.azurerm_resource_group,
    config.azurerm_app_service_portal,
    siteSourceControl
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
