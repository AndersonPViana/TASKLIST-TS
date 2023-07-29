export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class badRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class notFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class unauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401)
  }
}