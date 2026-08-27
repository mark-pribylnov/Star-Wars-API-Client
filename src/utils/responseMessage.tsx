import type { ReactNode } from 'react';

function formatErrorMessage(title: string, message: string) {
  return (
    <div>
      <strong>{title}</strong>
      <br />
      {message}
    </div>
  );
}

export function getNotOkResponseMessage(response: Response): ReactNode {
  switch (response.status) {
    case 400:
      return formatErrorMessage(
        `Bad request (${response.status})`,
        'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).'
      );
    case 401:
      return formatErrorMessage(
        `Unauthorized (${response.status})`,
        'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.'
      );
    case 403:
      return formatErrorMessage(
        `Forbidden (${response.status})`,
        "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike '401 Unauthorized', the client's identity is known to the server."
      );
    case 404:
      return formatErrorMessage(
        `Not found (${response.status})`,
        'The server cannot find the requested resource. URL is not recognized or the URL is valid but the resource itself does not exist.'
      );
    case 500:
      return formatErrorMessage(
        `Internal server error (${response.status})`,
        'The server has encountered a situation it does not know how to handle.'
      );
    case 502:
      return formatErrorMessage(
        `Bad gateway (${response.status})`,
        'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.'
      );
    case 503:
      return formatErrorMessage(
        `Service unavailable (${response.status})`,
        'The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.'
      );
    default:
      if (response.status >= 500) {
        return formatErrorMessage(
          `Server error (${response.status})`,
          'Something went wrong on the server. Please try again later.'
        );
      }
      return formatErrorMessage(
        `Request failed (${response.status})`,
        "We couldn't complete the request. Please try again."
      );
  }
}

export function getRetryFailedMessage(): ReactNode {
  return formatErrorMessage(
    "Still couldn't load data",
    "The retry didn't work. Something went wrong — please try again later."
  );
}
