import axios from 'axios';

const initialHttpCustomConfigs = {
  baseUrl: '',
  authentication: {
    token: '',
  },
};

export class Http {
  instance;

  customConfigs = initialHttpCustomConfigs;

  constructor(config) {
    const { handleBeforeRequestSend = this.handleBeforeRequestSend } = config || {};

    const instance = axios.create();

    instance.interceptors.request.use(handleBeforeRequestSend);
    this.instance = instance;
  }

  handleBeforeRequestSend = (config) => {
    const { isPrivateAPI, ...otherConfig } = config;
    const token = this.customConfigs.authentication.token;

    if (isPrivateAPI && otherConfig.headers) {
      otherConfig.headers.Authorization = `Bearer ${token}`;
    }

    return otherConfig;
  };

  async get(url, config = {}, isPrivateAPI = false) {
    const { instance } = this;
    const requestConfig = config || {};

    const response = await instance.get(url, {
      ...requestConfig,
      isPrivateAPI,
    });
    return response;
  }

  async post(url, data, config = {}, isPrivateAPI = false) {
    const { instance } = this;
    const requestConfig = config || {};

    const response = await instance.post(url, data, {
      ...requestConfig,
      isPrivateAPI,
    });
    return response;
  }

  async patch(url, data, config = {}, isPrivateAPI = false) {
    const { instance } = this;
    const requestConfig = config || {};

    const response = await instance.patch(url, data, {
      ...requestConfig,
      isPrivateAPI,
    });
    return response;
  }

  async delete(url, config = {}, isPrivateAPI = false) {
    const { instance } = this;
    const requestConfig = config || {};

    const response = await instance.delete(url, {
      ...requestConfig,
      isPrivateAPI,
    });
    return response;
  }

  getToken() {
    return this.customConfigs.authentication.token;
  }

  setCustomConfigs(configs) {
    if (configs) {
      this.instance.defaults.baseURL = configs.baseUrl;
    }

    this.customConfigs = { ...initialHttpCustomConfigs, ...configs };
  }
}
