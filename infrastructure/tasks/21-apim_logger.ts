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
import eventhubManagementClient = require("azure-arm-eventhub");

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  const eventhubClient = new eventhubManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  const key = await eventhubClient.eventHubs.listKeys(
    config.azurerm_resource_group,
    config.azurerm_eventhub_ns,
    config.azurerm_apim_eventhub,
    config.azurerm_apim_eventhub_rule
  );

  if (key.primaryConnectionString) {
    await apiClient.logger.createOrUpdate(
      config.azurerm_resource_group,
      config.azurerm_apim,
      config.apim_logger_id,
      {
        credentials: {
          connectionString: key.primaryConnectionString,
          name: config.azurerm_apim_eventhub
        },
        description: "API management EventHub logger",
        loggerType: "azureEventHub"
        // We have to cast to any here because of a bug in Azure ARM EventHub API:
        // when you update (PUT) the EventHub logger you MUST provide the loggerType
      } as any
    );
  }
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() =>
    console.log("successfully created EventHub logger for API management")
  )
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
