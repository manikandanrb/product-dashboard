import axios, { AxiosError } from 'axios';

/**
 * Base function for all errors thrown by a service.
 */
function ServiceError(message: string = 'Service Error'): Error {
  return new Error(message);
}

function ConflictError(message: string = 'Conflict'): Error {
  return new Error(message);
}

/**
 * Thrown when the network connection is down.
 */
function NetworkError(message: string = 'Network Error, Check your connection'): Error {
  return new Error(message);
}

/**
 * Thrown when the resource is not found on the server.
 */
function NotFoundError(message: string = 'Resource not found'): Error {
  return new Error(message);
}

/**
 * Thrown when the response.status is "400"
 * This usually occurs if the client's request was inaccurate or corrupted, and the server was unable to interpret it.
 */
function BadRequestError(message: string = 'Bad Request'): Error {
  return new Error(message);
}

/**
 * Thrown when the response.status is "401"
 * This usually occurs if the access token is not sent in the request or the access token expired or is invalid.
 */
function UnauthorizedAccessError(message: string = 'Not authorized, please login again'): Error {
  return new Error(message);
}

/**
 * Thrown when the response.status is "403"
 */
function AccessControlError(message: string = 'Access denied'): Error {
  return new Error(message);
}

/**
 * Thrown when the response.status is "500"
 */
function ServerError(message: string = 'Internal Server error'): Error {
  return new Error(message);
}

function isNetworkError(err: AxiosError): boolean {
  return err.isAxiosError && !err.response;
}

const errorMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized Access',
  403: 'Access Denied',
  404: 'Resource Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

const serviceError = (error: any, defaultMessage?: string): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      const defaultErrorMessage = defaultMessage || errorMessages[status];
      const message = (data as { message?: string })?.message || defaultErrorMessage;

      switch (status) {
        case 400:
          return BadRequestError(message);
        case 401:
          return UnauthorizedAccessError(message);
        case 403:
          return AccessControlError(message);
        case 404:
          return NotFoundError(message);
        case 409:
          return ConflictError(message);
        case 500:
          return ServerError(message);
        default:
          return ServiceError(message);
      }
    }
  } else if (isNetworkError(error)) {
    return NetworkError();
  }
  return error instanceof Error ? error : ServiceError();
};

export { serviceError };
