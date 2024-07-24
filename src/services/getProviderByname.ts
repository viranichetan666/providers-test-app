import { apiBase } from "../constant/env";

export interface IProviderDetailsResponse {
  apis: {
    [key: string]: IProviderDetails
  };
}

export interface IProviderDetails {
  added: string;
  info: {
    contact: {
      email: string;
      name: string;
      url: string;
      "x-twitter": string;
    };
    description: string;
    title: string;
    version: string;
    "x-apisguru-categories": string[];
    "x-logo": {
      url: string;
    };
    "x-origin": {
      format: string;
      url: string;
      version: string;
    }[];
    "x-providerName": string;
    "x-serviceName": string;
    "x-unofficialSpec": boolean;
  };
  updated: string;
  swaggerUrl: string;
  swaggerYamlUrl: string;
  openapiVer: string;
  link: string;
}

function fetchProviderByName(name: string): Promise<IProviderDetailsResponse> {
  return new Promise((resolve, reject) => {
    fetch(`${apiBase}/${name}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default fetchProviderByName;
