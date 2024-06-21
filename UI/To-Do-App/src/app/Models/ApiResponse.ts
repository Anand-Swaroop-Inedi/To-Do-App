export class ApiResponse {
  statusCode: number;
  message: string;
  result: any;
  constructor(response: ApiResponse) {
    this.statusCode = response.statusCode;
    this.message = response.message;
    this.result = response.result;
  }
}
