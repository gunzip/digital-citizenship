/**
 * This file export a method used to parse and validate
 * the resources configuration file (from a json to a typed interface).
 */
// tslint:disable:no-any
// tslint:disable:object-literal-sort-keys

import * as fs from "fs";
import * as path from "path";
import * as readlineSync from "readline-sync";

// configuration file to feed terraform settings
const TF_VARS_FILE_NAME = "tfvars.json";

// configuration file with variables used from tasks
const COMMON_CONFIG_FILE_NAME = "config.json";

function failIfEmpty(
  key: string,
  value: string | ReadonlyArray<any>
): string | ReadonlyArray<any> {
  if (!value) {
    throw new TypeError(
      `empty parameter not allowed in configuration file: ${key}`
    );
  }
  return key;
}

type Partial<T> = { [P in keyof T]?: T[P] };

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
  readonly azurerm_apim_eventhub: string;
  readonly azurerm_eventhub_ns: string;
  readonly apim_scm_username: string;
  readonly apim_scm_cred_username: string;
  readonly apim_apis: ReadonlyArray<IApiDescription>;
  readonly message_blob_container: string;
  readonly azure_portal_ips: ReadonlyArray<string>;
}

/**
 * Merge and parses configuration files.
 * Throws an Exception and exit on any kind of error.
 */
export const readConfig = (
  environment: string
): Promise<IResourcesConfiguration> => {
  return new Promise(resolve => {
    if (!environment) {
      throw new Error("Please set ENVIRONMENT variable");
    }

    const tfFilePath = path.join(
      __dirname,
      "..",
      "infrastructure",
      "env",
      environment,
      TF_VARS_FILE_NAME
    );
    if (!fs.existsSync(tfFilePath)) {
      throw new Error("Cannot find configuration file: " + tfFilePath);
    }
    const tfConfig = JSON.parse(fs.readFileSync(tfFilePath, "utf8"));

    const commonConfigFilePath = path.join(
      "",
      __dirname,
      "..",
      "infrastructure",
      "env",
      "common",
      COMMON_CONFIG_FILE_NAME
    );
    if (!fs.existsSync(commonConfigFilePath)) {
      throw new Error(
        "Cannot find configuration file: " + commonConfigFilePath
      );
    }
    const commonConfig = JSON.parse(
      fs.readFileSync(commonConfigFilePath, "utf8")
    );

    const config = { ...commonConfig, ...tfConfig } as IResourcesConfiguration;

    // tslint:disable-next-line:no-console
    console.log(config);

    const checkConfig: Partial<IResourcesConfiguration> = {
      environment: config.environment,
      location: config.location,
      cosmosdb_failover_location: config.cosmosdb_failover_location,
      azurerm_resource_group: config.azurerm_resource_group,
      azurerm_storage_account: config.azurerm_storage_account,
      azurerm_storage_container: config.azurerm_storage_container,
      azurerm_storage_queue_emailnotifications:
        config.azurerm_storage_queue_emailnotifications,
      azurerm_storage_queue_createdmessages:
        config.azurerm_storage_queue_createdmessages,
      azurerm_cosmosdb: config.azurerm_cosmosdb,
      azurerm_cosmosdb_documentdb: config.azurerm_cosmosdb_documentdb,
      azurerm_cosmosdb_collections: config.azurerm_cosmosdb_collections,
      azurerm_app_service_plan: config.azurerm_app_service_plan,
      azurerm_functionapp: config.azurerm_functionapp,
      azurerm_functionapp_slot: config.azurerm_functionapp_slot,
      functionapp_nodejs_version: config.functionapp_nodejs_version,
      azurerm_functionapp_storage_account:
        config.azurerm_functionapp_storage_account,
      azurerm_application_insights: config.azurerm_application_insights,
      azurerm_log_analytics: config.azurerm_log_analytics,
      azurerm_apim: config.azurerm_apim,
      apim_apis: config.apim_apis,
      apim_email: config.apim_email,
      apim_publisher: config.apim_publisher,
      apim_sku: config.apim_sku,
      azurerm_eventhub_ns: config.azurerm_eventhub_ns,
      azurerm_apim_eventhub: config.azurerm_apim_eventhub,
      apim_scm_username: config.apim_scm_username,
      apim_scm_cred_username: config.apim_scm_cred_username,
      message_blob_container: config.message_blob_container,
      azure_portal_ips: config.azure_portal_ips
    };

    Object.keys(checkConfig).forEach(k =>
      failIfEmpty(k, (checkConfig as any)[k])
    );

    if (
      !process.env.NPMDEPLOY &&
      !readlineSync.keyInYNStrict(
        `Do you want to proceed with this configuration (${environment}) ?`
      )
    ) {
      throw new Error("Aborted.");
    }

    return resolve(config);
  });
};
