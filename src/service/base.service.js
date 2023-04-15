import { Http } from './http.service';
export class BaseService {
  httpClient;

  constructor() {
    const httpClient = new Http();
    httpClient.setCustomConfigs({
      //server api url
      baseUrl: 'http://localhost:8088/',
    });
    this.httpClient = httpClient;
  }
}

export const baseService = new BaseService();
