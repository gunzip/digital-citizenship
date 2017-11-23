// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import readConfig from "../../lib/config";
const configx = readConfig(__dirname + "/../tfvars.json");

import { getFunctionsInfo } from "../../lib/utils";

import apiManagementClient = require("azure-arm-apimanagement");
import webSiteManagementClient = require("azure-arm-website");

import * as fs from "fs";
import * as path from "path";

// While it's usually safe to programmatically sync the API *operations*
// to the API management ones retrieving them
// from the OpenAPI Functions endpoint (swagger.json),
// adding API to products or/and modifying API policies
// it's far less safe as these tasks are commonly run
// using the Azure portal interface (web UI), so the risk of
// overriding the already modified settings is high.
// For this reason we provide a default behavior for this task
// (just sync the API operations) and opt-in environment variables
// to sync API products and policies as well.
const ADD_API_TO_PRODUCTS = process.env.ADD_API_TO_PRODUCTS;
const ADD_API_TO_POLICY = process.env.ADD_API_TO_POLICY;

// @TODO: remove
// tslint:disable
const config = {
  ...configx,
  azurerm_resource_group: "agid-rg-dev",
  azurerm_apim: "agid-apim-dev"
};

export const run = async () => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  return Promise.all(
    config.apim_apis.map(async apiEntry => {
      // Get OpenAPI specs path and code from Functions
      const webSiteClient = new webSiteManagementClient(
        loginCreds.creds as any,
        loginCreds.subscriptionId
      );
      const { masterKey, backendUrl } = await getFunctionsInfo(
        configx,
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
          // WARNING: serviceUrl is taken from the swagger specs (remote json)
          // and there's no way to override that value here: it *must* be changed
          // manually in the API management settings
          // (or provide a real value in the swagger specs).
          serviceUrl: backendUrl,
          protocols: ["https"]
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
      // Add a policy to the API
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

run()
  .then(() => console.log("successfully deployed APIs to API management"))
  .catch(console.error);
