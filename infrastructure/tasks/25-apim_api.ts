/**
 * Run this task from the command line to sync the API Manager APIs
 * from the OpenAPI specs (operations) exposed by Functions.
 *
 * $ ts-node apim_api.ts
 *
 * This task assumes that the following resources are already created:
 *  - Resource group
 *  - Functions (app service)
 *  - API management resource
 *
 */
// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import { IResourcesConfiguration, readConfig } from "../../lib/config";

import { getFunctionsInfo } from "../../lib/task_utils";

import apiManagementClient = require("azure-arm-apimanagement");
import webSiteManagementClient = require("azure-arm-website");

import * as fs from "fs";
import * as path from "path";

// While it's usually safe to programmatically sync the API *operations*
// retrieved from the Functions OpenAPI endpoint(s) to the API management ones,
// it's far less safe to add API to products or/and to modify API policies: these tasks are commonly run
// using the Azure portal interface (web UI), so the risk of overriding already modified settings is high.
// For this reason we provide a default behavior for this task (just sync the API operations)
// and opt-in environment variables to sync API products and policies as well.
const ADD_API_TO_PRODUCTS = process.env.ADD_API_TO_PRODUCTS;
const ADD_API_TO_POLICY = process.env.ADD_API_TO_POLICY;

export const run = async (config: IResourcesConfiguration) => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  return Promise.all(
    config.apim_apis.map(async apiEntry => {
      // Get OpenAPI specs path and code (masterKey) from Functions
      const webSiteClient = new webSiteManagementClient(
        loginCreds.creds as any,
        loginCreds.subscriptionId
      );
      const { masterKey, backendUrl } = await getFunctionsInfo(
        config,
        webSiteClient
      );
      const contentValue = `${backendUrl}${apiEntry.api
        .specsPath}?code=${masterKey}`;

      // Add API to API management
      await apiClient.api.createOrUpdate(
        config.azurerm_resource_group,
        config.azurerm_apim,
        apiEntry.id,
        {
          contentFormat: "swagger-link-json",
          contentValue,
          displayName: apiEntry.api.displayName,
          path: apiEntry.api.path,
          protocols: ["https"],
          // WARNING: serviceUrl is taken from the swagger specs "host" field
          // and there's no way to override that value here: it *must* be changed
          // manually in the API management settings
          // (or provide a real value in the swagger specs).
          serviceUrl: backendUrl
        }
      );
      // Add API to products
      if (ADD_API_TO_PRODUCTS) {
        await Promise.all(
          apiEntry.products.map(async product => {
            await apiClient.productApi.createOrUpdate(
              config.azurerm_resource_group,
              config.azurerm_apim,
              product,
              apiEntry.id
            );
          })
        );
      }
      // Add a policy to the API reading it from a file
      if (ADD_API_TO_POLICY && apiEntry.policyFile) {
        const policyContent = fs.readFileSync(
          path.join(__dirname, "..", "api-policies", apiEntry.policyFile),
          "utf8"
        );
        await apiClient.apiPolicy.createOrUpdate(
          config.azurerm_resource_group,
          config.azurerm_apim,
          apiEntry.id,
          {
            policyContent
          },
          // If-Match: *
          "*"
        );
      }
    })
  );
};

readConfig(process.env.ENVIRONMENT)
  .then(run)
  .then(() => console.log("successfully synched APIs to API management"))
  .catch((e: Error) => console.error(process.env.VERBOSE ? e : e.message));
