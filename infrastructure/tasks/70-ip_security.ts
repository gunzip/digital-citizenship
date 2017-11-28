/**
 * This task setup IP reatrictions for
 * 
 * - CosmosDB account (allowing access from Functions and Azure portal)
 * - Storage account (allowing access from Functions and Azure portal)
 * - Functions (allowing access from the API management)
 * 
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import CosmosDBManagementClient = require("azure-arm-cosmosdb");
import webSiteManagementClient = require("azure-arm-website");

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  // @TODO: Get Functions host IP
  const functionIp = "127.0.0.1";

  // @TODO: Get API management IP
  const apimIp = "127.0.0.1";

  // @TODO: Update storageaccount: restrict access to Functions IP
  console.log("Allow access to Storage account from IPs: " + functionIp);

  // Update cosmosdb: restrict access to Functions IP
  const cosmosDbClient = new CosmosDBManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  const cosmosdb = await cosmosDbClient.databaseAccounts.get(
    config.azurerm_resource_group,
    config.azurerm_cosmosdb
  );

  // @TODO: check param overrides
  if (cosmosdb.failoverPolicies) {
    // IP addresses/ranges must be comma separated and must not contain any spaces.
    const ipRangeFilter = Array.from(
      new Set(
        [
          [functionIp],
          config.azure_portal_ips.map(s => s.trim()),
          (cosmosdb.ipRangeFilter || "").split(",")
        ].reduce((a, b) => a.concat(b), [])
      )
    ).join(",");

    console.log("Allow accesso to CosmosDB from IPs: " + ipRangeFilter);

    await cosmosDbClient.databaseAccounts.createOrUpdate(
      config.azurerm_resource_group,
      config.azurerm_cosmosdb,
      {
        // consistencyPolicy: cosmosdb.consistencyPolicy,
        // enableAutomaticFailover: cosmosdb.enableAutomaticFailover,
        // id: cosmosdb.id,
        ipRangeFilter,
        // kind: cosmosdb.kind,
        location: cosmosdb.location,
        // for some odd reason "locations" here equals failoverPolicies
        // see https://github.com/terraform-providers/terraform-provider-azurerm/blob/master/azurerm/resource_arm_cosmos_db_account.go#L167
        locations: cosmosdb.failoverPolicies
        // name: cosmosdb.name,
        // tags: cosmosdb.tags,
        // type: cosmosdb.type
      }
    );
  }

  // Update web app (functions): restrict access to API management IP
  const webSiteClient = new webSiteManagementClient(
    loginCreds.creds as any,
    loginCreds.subscriptionId
  );

  const configuration = await webSiteClient.webApps.getConfiguration(
    config.azurerm_resource_group,
    config.azurerm_functionapp
  );

  const azurePortalAddresses = config.azure_portal_ips.map(s => ({
    ipAddress: s.trim()
  }));

  // @TODO: check param overrides
  const newSiteConfig = {
    // ...configuration,
    ipSecurityRestrictions: [
      ...(configuration.ipSecurityRestrictions || []),
      ...azurePortalAddresses,
      {
        ipAddress: apimIp
      }
    ]
  };

  // console.log(configuration);
  console.log(
    "Allow access to Functions from IPs: " +
      newSiteConfig.ipSecurityRestrictions.map(ip => ip.ipAddress).join(",")
  );

  await webSiteClient.webApps.updateConfiguration(
    config.azurerm_resource_group,
    config.azurerm_functionapp,
    newSiteConfig
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() => console.log("successfully set up IP restrictions"))
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
