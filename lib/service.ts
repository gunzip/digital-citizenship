/**
 * Creates a new Service tied to the user subscription
 * in the API management resource.
 */
// tslint:disable:no-console

import * as request from "request";

import { none, Option, some } from "ts-option";

export interface IServicePayload {
  readonly service_name: string;
  readonly department_name: string;
  readonly organization_name: string;
  readonly service_id: string;
  readonly authorized_recipients: ReadonlyArray<string>;
  readonly authorized_cidrs: ReadonlyArray<string>;
}

/**
 * RESTful call to Digital Citizenship API
 *  that creates a new Service for the current logged-in user.
 */
export const createOrUpdateService = (
  apiKey: string,
  service: IServicePayload,
  apiUrl: string
) => {
  return new Promise(async (resolve, reject) => {
    const maybeService = await getService(apiKey, service.service_id, apiUrl);
    const options = {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey
      },
      json: service,
      method: maybeService.isEmpty ? "POST" : "PUT",
      uri: `${apiUrl}/adm/services${maybeService.isEmpty
        ? ""
        : "/" + service.service_id}`
    };
    request(options, (err, res, body) => {
      if (err) {
        console.error("createService|error|" + JSON.stringify(err));
        return reject(err);
      } else if (res.statusCode !== 200) {
        return reject(new Error(JSON.stringify(body)));
      } else {
        resolve({ res, body });
      }
    });
  });
};

export const getService = (
  apiKey: string,
  serviceId: string,
  apiUrl: string
): Promise<Option<{}>> => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey
      },
      method: "GET",
      uri: `${apiUrl}/adm/services/${serviceId}`
    };
    request(options, (err, res, body) => {
      if (err) {
        console.error("getService|error|" + JSON.stringify(err));
        return reject(err);
      } else if (res.statusCode === 404) {
        return resolve(none);
      } else if (res.statusCode !== 200) {
        return reject(new Error(body));
      } else {
        resolve(some(body));
      }
    });
  });
};
