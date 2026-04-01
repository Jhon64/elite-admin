import { IResponse } from '../http/models/IResponse.model';
import { environment } from './../../../environments/environment';
import { Http2, Http2Config } from './../http/http2';
import { Injectable } from '@angular/core';

import { ArrayToHelper } from '../../helpers/array-to.helpers';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

export interface IFindAllProps<T> {
  param?: any;
  keyMap?: keyof T;
  url?: string;
  setBaseURL?: string;
  id?: number;
  ignoreEmpresaID?: boolean; // Para ignorar el campo empresaID en la búsqueda
}

export interface IRegisterProps<T> {
  body: Partial<T>;
  url?: string;
  useFormData?: boolean; // Para usar FormData en lugar de JSON
  formData?: FormData; // Para usar el campo empresaID en el registro
  ignoreEmpresaID?: boolean; // Para ignorar el campo empresaID en el registro
}

export interface IDeletedProps {
  id: number;
  url?: string;
}
@Injectable({
  providedIn: 'root',
})
export class StandardService<T = any, R = T> {
  private http2: Http2; // Instancia de Http2 para realizar las peticiones HTTP
  constructor(private http: HttpClient) {
    const baseUrl = environment.apiUrl;
    this.http2 = new Http2(http, {
      baseURL: baseUrl,
      retries: 1,
      url: undefined,
      timeout: 15000, // URL base para las peticiones HTTP
    }); // Inicialización de Http2
  }

  setConfig(config: Partial<Http2Config>) {
    this.http2 = new Http2(this.http, {
      baseURL: config.baseURL || this.http2['baseURL'],
      timeout: config.timeout || this.http2['timeoutMs'],
      retries: config.retries || this.http2['retries'],
      url: config.url,
    });
  }

  getAll(props?: IFindAllProps<T>) {
    // debugger
    return this.http2
      .Fetch({
        url: props?.url ?? '',
        method: 'GET',
        baseURL: props?.setBaseURL,
        params: props?.param,
      })
      .pipe(
        map((response) => {
          if (response.status !== 200) {
            throw new Error(response.message || 'Error al listar');
          }

          const data = response.data ?? [];

          if (props?.keyMap) {
            const mapData = ArrayToHelper.MapN<T>(data, props.keyMap as string);
            return {
              list: data,
              map: mapData,
              status: response.status,
              message: response.message,
            };
          }
          return response;
        }),
        catchError((error) => this.handleListError(error)),
      );
  }

  // =========================
  // 🔥 MANEJO CENTRALIZADO
  // =========================

  private handleListError(error: any): Observable<IResponse<T>> {
    console.error('HTTP ERROR:', error);

    return of({
      list: null,
      map: null,
      data: null,
      path: '',
      timestamp: new Date().toISOString(),
      status: error?.status ?? 500,
      message: error?.message ?? 'Error desconocido',
    } as any);
  }

  private handleSingleError<X>(error: any): Observable<IResponse<X>> {
    console.error('HTTP ERROR:', error);

    return of({
      status: error?.status ?? 500,
      message: error?.message ?? 'Error desconocido',
      data: null as any,
    } as IResponse<X>);
  }

  /* 
	async findByID(props?: IFindAllProps<T>): Promise<IBaseResponse<T>> {
		try {
			const url = props?.url ? props?.url : this.baseUrl
			const result = await Http.GET(url, props?.param)

			if (result.status !== 200) {
				NotificacionUtils.error(result.data?.message || 'Error al listar')
				throw new Error(result.data?.message || 'Error al listar')
			}

			const data = result.data

			return {
				data: data,
				status: result.status,
				message: result.message,
			}
		} catch (error: any) {
			console.error('Error:', error)
			return {
				data: null,
				status: error?.status ?? 500,
				message: error?.data?.message ?? 'Error desconocido',
			}
		}
	}

	async register(props: IRegisterProps<R>): Promise<IBaseResponse<R>> {
		try {
			const url = props?.url ? props?.url : this.baseUrl
			let result
			if (!props.useFormData) {
				result = await Http.POST(url, props.body)
			} else {
				result = await Http.POST(url, props.formData, {
					'Content-Type': 'multipart/form-data',
				})
			}

			if (result.status !== 200) {
				NotificacionUtils.error(result.data?.message || 'Error al registrar')
			}

			return {
				data: result.data,
				status: result.status,
				message: result.message,
			}
		} catch (error: any) {
			return {
				status: error?.status ?? 500,
				message: error?.data?.message ?? 'Error desconocido',
			}
		}
	}

	async update(props: IRegisterProps<R>): Promise<IBaseResponse<string>> {
		try {
			const url = props?.url ? props?.url : this.baseUrl
			const result = await Http.PUT(url, props.body)

			if (result.status !== 200) {
				NotificacionUtils.error(result.data?.message || 'Error al actualizar')
			}

			return {
				data: result.data,
				status: result.status,
				message: result.message,
			}
		} catch (error: any) {
			return {
				status: error?.status ?? 500,
				message: error?.data?.message ?? 'Error desconocido',
			}
		}
	}

	async delete(props: IDeletedProps): Promise<IBaseResponse<string>> {
		try {
			const url = props?.url ? props?.url : this.baseUrl
			const result = await Http.DELETE(`${url}/${props.id}`)

			if (result.status !== 200) {
				NotificacionUtils.error(result.data?.message || 'Error al eliminar')
			}

			return {
				data: result.data,
				status: result.status,
				message: result.message,
			}
		} catch (error: any) {
			return {
				status: error?.status ?? 500,
				message: error?.data?.message ?? 'Error desconocido',
			}
		}
	} */
}
