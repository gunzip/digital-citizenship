// tslint:disable:no-console
// tslint:disable:no-any

import { login } from "../../lib/login";

import readConfig from "../../lib/config";
const config = readConfig(__dirname + "/../tfvars.json");

import apiManagementClient = require("azure-arm-apimanagement");

import * as fs from "fs";
import * as path from "path";

const OPT_ADD_API_TO_PRODUCTS = process.env.ADD_API_TO_PRODUCTS;
const OPT_ADD_API_TO_POLICY = process.env.ADD_API_TO_POLICY;

export const run = async () => {
  const loginCreds = await login();

  const apiClient = new apiManagementClient(
    (loginCreds as any).creds,
    loginCreds.subscriptionId
  );

  config.apim_apis.forEach(async apiEntry => {
    // Add API to API management
    await apiClient.api.createOrUpdate(
      config.azurerm_resource_group,
      config.azurerm_apim,
      apiEntry.id,
      {
        ...apiEntry.api,
        contentFormat: "swagger-link-json",
        protocols: ["https"]
      }
    );
    // Add API to products
    if (OPT_ADD_API_TO_PRODUCTS) {
      apiEntry.products.forEach(async product => {
        await apiClient.productApi.createOrUpdate(
          config.azurerm_resource_group,
          config.azurerm_apim,
          product,
          apiEntry.id
        );
      });
    }
    // Add a policy to the API
    if (OPT_ADD_API_TO_POLICY && apiEntry.policyFile) {
      const policyContent = JSON.stringify(
        fs.readFileSync(
          path.join(__dirname, "..", "api-policies", apiEntry.policyFile),
          "utf8"
        )
      );
      await apiClient.apiPolicy.createOrUpdate(
        config.azurerm_resource_group,
        config.azurerm_apim,
        apiEntry.id,
        {
          policyContent
        },
        "*"
      );
    }
  });
};

run()
  .then(() => console.log("successfully deployed APIs to API management"))
  .catch(console.error);
