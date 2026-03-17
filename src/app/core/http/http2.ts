import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpConfig } from './models/IHttpConfig.model';
import { IResponse } from './models/IResponse.model';

export interface Http2Config {
  baseURL?: string;
  token?: string;
  url?: string;
  host?: string;
  user?: string;
  timeout: number;
  retries: number;
}
export class Http2 {
  private baseURL: string;
  private timeoutMs: number;
  private retries: number;
  constructor(
    private http: HttpClient,
    private config: Http2Config,
  ) {
    this.baseURL = config?.baseURL || '';
    this.timeoutMs = config?.timeout || 15000;
    this.retries = config?.retries || 2;
  }

  //usamos esta funciona para ejecutar las peticiones http, recibe un objeto de tipo IHttpConfig con la configuracion de la peticion
  // la informacion la procesamos en un servicio superior, para manejar los errores y la logica de negocio
  Fetch(config2?: IHttpConfig) {
    var config: IHttpConfig = { baseURL: this.config.baseURL, url: this.config.url } as IHttpConfig;
    debugger;
    if (config2 && config2.baseURL) {
      config.baseURL = config2.baseURL;
    }

    config.params = {
      username: this.config.user || '-',
      host: this.config.host || '-',
    };

    if (config2?.url) config.url = config2.url;
    if (config2?.method) config.method = config2.method;
    if (config2?.headers) config.headers = config2.headers;
    if (config2?.body) config.body = config2.body;
    if (config2?.params) config.params = config2.params;

    if (config.params) {
      const params = new URLSearchParams();
      for (const key in config.params) {
        if (config.params.hasOwnProperty(key)) {
          params.append(key, config.params[key].toString());
        }
      }
      /**pendiente de agregar parametros de auditoria como usuario,ip,empresa */
      if (config.method === 'GET') {
        /*  */
        config.url += `?${params.toString()}`;
      } else {
        config.body = { ...config.body, ...Object.fromEntries(params) };
      }
    }

    // 🔐 AQUÍ ARMAS EL REQUEST PARA EL GATEWAY
    const payload = {
      url: config.url,
      httpMethod: config.method,
      body: config.body,
      params: config.params,
    };

    return this.http.request<IResponse<any>>(
      config.method,
      `${config.baseURL ?? ''}${config.url ?? ''}`,
      {
        headers: config.headers,
        body: config.body,
        // params: config.params,
      },
    );
  }
}
