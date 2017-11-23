/**
 * This file export a method used to parse and validate
 * the resources configuration file (from a json to a typed interface).
 */
// tslint:disable:no-any
// tslint:disable:object-literal-sort-keys

import * as fs from "fs";

function failIfEmpty(
  what: string | ReadonlyArray<any>
): string | ReadonlyArray<any> {
  if (!what) {
    throw new TypeError("empty parameter not allowed in configuration file");
  }
  return what;
}

interface IApiDescription {
  readonly id: string;
  readonly api: {
    readonly specsPath: string;
    readonly displayName: string;
    readonly path: string;
  };
  readonly products: ReadonlyArray<string>;
  readonly policyFile: string;
}

export interface IResourcesConfiguration {
  readonly environment: string;
  readonly location: string;
  readonly cosmosdb_failover_location: string;
  readonly azurerm_resource_group: string;
  readonly azurerm_storage_account: string;
  readonly azurerm_storage_container: string;
  readonly azurerm_storage_queue_emailnotifications: string;
  readonly azurerm_storage_queue_createdmessages: string;
  readonly azurerm_cosmosdb: string;
  readonly azurerm_cosmosdb_documentdb: string;
  readonly azurerm_cosmosdb_collections: ReadonlyArray<{
    readonly name: string;
    readonly partitionKey: string;
  }>;
  readonly azurerm_app_service_plan: string;
  readonly azurerm_functionapp: string;
  readonly azurerm_functionapp_slot: string;
  readonly functionapp_git_repo: string;
  readonly functionapp_git_branch: string;
  readonly functionapp_scm_type: string;
  readonly functionapp_nodejs_version: string;
  readonly azurerm_functionapp_storage_account: string;
  readonly azurerm_application_insights: string;
  readonly azurerm_log_analytics: string;
  readonly azurerm_apim: string;
  readonly apim_email: string;
  readonly apim_publisher: string;
  readonly apim_sku: string;
  readonly apim_scm_username: string;
  readonly apim_scm_cred_username: string;
  readonly apim_apis: ReadonlyArray<IApiDescription>;
  readonly message_blob_container: string;
}

/**
 * Parses a configuration file.
 * Throws an Exception and exit on any kind of error.
 */
export default (filePath: string): IResourcesConfiguration => {
  const config = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as IResourcesConfiguration;
  [
    config.environment,
    config.location,
    config.cosmosdb_failover_location,
    config.azurerm_resource_group,
    config.azurerm_storage_account,
    config.azurerm_storage_container,
    config.azurerm_storage_queue_emailnotifications,
    config.azurerm_storage_queue_createdmessages,
    config.azurerm_cosmosdb,
    config.azurerm_cosmosdb_documentdb,
    config.azurerm_cosmosdb_collections,
    config.azurerm_app_service_plan,
    config.azurerm_functionapp,
    config.azurerm_functionapp_slot,
    config.functionapp_nodejs_version,
    config.azurerm_functionapp_storage_account,
    config.azurerm_application_insights,
    config.azurerm_log_analytics,
    config.azurerm_apim,
    config.apim_apis,
    config.apim_email,
    config.apim_publisher,
    config.apim_sku,
    config.apim_scm_username,
    config.apim_scm_cred_username,
    config.message_blob_container
  ].forEach(failIfEmpty);

  return config;
};
