import { Request } from "framework7/framework7.esm.bundle";

const http = {
  get(config) {
    if (typeof config === "string") {
      config = {
        url: config
      };
    }

    return new Promise((resolve, reject) => {
      Request(
        Object.assign(
          {},
          {
            method: "GET",
            dataType: "json",
            cache: false,
            success: result => {
              resolve(result);
            },
            error: (xhr, status) => {
              console.log(status);
              reject(xhr, status);
            }
          },
          config
        )
      );
    });
  },

  post(config = {}) {
    return new Promise((resolve, reject) => {
      Request(
        Object.assign(
          {},
          {
            method: "POST",
            dataType: "json",
            cache: false,
            success: result => {
              resolve(result);
            },
            error: (xhr, status) => {
              console.log(status);
              reject(xhr, status);
            }
          },
          config
        )
      );
    });
  }
};

export default http;
