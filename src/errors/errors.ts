export class ApiError {
  status: number;
  message: any;
  constructor(status: number, message: any) {
    this.status = status;
    this.message = message;
  }
  static BadRequest(message: any) {
    return new ApiError(400, message);
  }

  static InternalError(message: any) {
    return new ApiError(500, message);
  }

  static UnAuthorized(message: any) {
    return new ApiError(401, message);
  }
  static NotFound(message: any) {
    return new ApiError(404, message);
  }
  static Forbidden(message: any) {
    return new ApiError(403, message);
  }
}
