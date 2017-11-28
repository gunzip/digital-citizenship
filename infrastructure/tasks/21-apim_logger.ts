/**
 * Run this task from the command line to create en EventHub logger for API Management.
 *
 * $ ts-node apim_logger.ts
 *
 * Reference:
 *  https://docs.microsoft.com/it-it/azure/api-management/api-management-howto-log-event-hubs
 *  https://docs.microsoft.com/it-it/rest/api/apimanagement/Logger/CreateOrUpdate
 *
 * This task assumes that the following resources are already created:
 *  - Resource group
 *  - API management resource
 *  - EventHub
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import apiManagementClient = require("azure-arm-apimanagement");

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  await apiClient.logger.createOrUpdate(
    config.azurerm_resource_group,
    config.azurerm_apim,
    config.,
    {
      credentials: {
        connectionString: "",
        name: ""
      },
      description: "API management logger"
    }
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() =>
    console.log("successfully created EventHub logger for API management")
  )
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
