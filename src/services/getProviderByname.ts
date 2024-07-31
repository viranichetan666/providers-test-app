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

const fetchProviderByName = async (name: string): Promise<IProviderDetailsResponse> => {
  const data = await fetch(`${apiBase}/${name}.json`)
  const result = await data.json()
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 3000);
  });
}

export default fetchProviderByName;
