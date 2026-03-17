export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
  path: string; // Agregamos 'data' opcionalmente
  timestamp: string;
  list?: T[];
  map?: Map<number, T>;
}
