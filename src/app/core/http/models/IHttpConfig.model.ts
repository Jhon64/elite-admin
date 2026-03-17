import { HttpHeaders } from "@angular/common/http";

export interface IHttpConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HttpHeaders //|{ [key: string]: string };
  body?: any;
  baseURL?: string;
  params?: { [key: string]: string | number };
}
