export interface ProviderSetting {
  PK?: string;
  SK?: string;
  ID?: string;
  Status: string;
  IDService: number;
  IDCountry: number;
  IDOperator: number;
  IDProvider: number;
  IDClient: number;
  RegDate?: string;
  UpdateDate?: string;
  RequestSettings: RequestSettings;
  ResponseSettings: ResponseSettings;
}

export interface RequestSettings {
  BasicURL: string;
  DataType: string;
  Action: string;
  Parameters: Parameter[];
  Headers: Header[];
}

export interface ResponseSettings {
  DataType: string;
}

export interface Header {
  Key: string;
  Value: string;
}
export interface Parameter {
  Name: string;
  Type: string;
  Value: string;
}
