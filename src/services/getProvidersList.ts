import { apiBase } from "../constant/env";

function fetchProviderList(): Promise<{ data: string[] }> {
  return new Promise((resolve, reject) => {
    fetch(`${apiBase}/providers.json`)
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

export default fetchProviderList;
