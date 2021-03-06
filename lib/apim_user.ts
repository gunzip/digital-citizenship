/**
 * Methods used to add users to API manager Products and Groups.
 */
// tslint:disable:no-console

import apiManagementClient = require("azure-arm-apimanagement");

import {
  SubscriptionContract,
  UserContract,
  UserCreateParameters
} from "azure-arm-apimanagement/lib/models";

import { IResourcesConfiguration } from "./config";

import * as crypto from "crypto";

export interface IUserData extends UserCreateParameters {
  readonly oid: string;
  readonly productName: string;
  readonly groups: ReadonlyArray<string>;
}

/**
 *  Assigns a deterministic / predictable id to the user's subscription.
 *  Useful in case we want to retrieve it later.
 */
export const userIdToSubscriptionId = (userId: string, productName: string) =>
  // To include only a predictable set of characters
  // we use an md5 hash of the product name
  // combined with the userId (which is an hash by itself).
  // Dashes must be avoided as they do not play well
  // together with the version field of the Service entity.
  // Taking just a few charactes from the product name hash avoids
  // collisions with subscriptions by the same user to other products.
  `${userId}${crypto
    .createHash("md5")
    .update(productName)
    .digest("hex")
    .substring(0, 4)}`;

const getExistingUser = async (
  apiClient: apiManagementClient,
  userId: string,
  config: IResourcesConfiguration
) => {
  return apiClient.user.get(
    config.azurerm_resource_group,
    config.azurerm_apim,
    userId
  );
};

const addUserToProduct = async (
  apiClient: apiManagementClient,
  user: UserContract,
  productName: string,
  config: IResourcesConfiguration
) => {
  const product = await apiClient.product.get(
    config.azurerm_resource_group,
    config.azurerm_apim,
    productName
  );
  if (user && user.id && user.name && product && product.id && productName) {
    // For some odd reason in the Azure ARM API user.name here is
    // in reality the user.id
    const subscriptionId = userIdToSubscriptionId(user.name, productName);
    // We do not skip existing subscriptions so we can activate a canceled one.
    return apiClient.subscription.createOrUpdate(
      config.azurerm_resource_group,
      config.azurerm_apim,
      subscriptionId,
      {
        displayName: subscriptionId,
        productId: product.id,
        state: "active",
        userId: user.id
      }
    );
  } else {
    return Promise.reject(
      new Error("Cannot find API manager product for update")
    );
  }
};

const addUserToGroups = async (
  apiClient: apiManagementClient,
  user: UserContract,
  groups: ReadonlyArray<string>,
  config: IResourcesConfiguration
) => {
  if (!user || !user.name) {
    return Promise.reject(new Error("Cannot parse user"));
  }
  const existingGroups = await apiClient.userGroup.list(
    config.azurerm_resource_group,
    config.azurerm_apim,
    user.name
  );
  const existingGroupsNames = new Set(existingGroups.map(g => g.name));
  const missingGroups = new Set(
    groups.filter(g => !existingGroupsNames.has(g))
  );
  if (missingGroups.size === 0) {
    return Promise.resolve(user);
  }
  return Promise.all(
    groups.map(async group => {
      // For some odd reason in the Azure ARM API user.name here is
      // in reality the user.id
      return await apiClient.groupUser.create(
        config.azurerm_resource_group,
        config.azurerm_apim,
        group,
        user.name as string
      );
    })
  );
};

/**
 * Assign an existing API user to products and groups.
 */
export const updateApimUser = async (
  userId: string,
  userData: IUserData,
  apiClient: apiManagementClient,
  config: IResourcesConfiguration
): Promise<SubscriptionContract> => {
  const user = await getExistingUser(apiClient, userId, config);
  await addUserToGroups(apiClient, user, userData.groups, config);
  return addUserToProduct(apiClient, user, userData.productName, config);
};
