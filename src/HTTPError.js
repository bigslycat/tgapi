/* @flow */

const getHTTPStatusMessage = (httpStatusCode: number) => {
  switch (httpStatusCode) {
    case 100: return 'Continue'
    case 101: return 'Switching Protocols'
    case 102: return 'Processing'

    case 200: return 'OK'
    case 201: return 'Created'
    case 202: return 'Accepted'
    case 203: return 'Non'
    case 204: return 'No Content'
    case 205: return 'Reset Content'
    case 206: return 'Partial Content'
    case 207: return 'Multi'
    case 226: return 'IM Used'

    case 300: return 'Multiple Choices'
    case 301: return 'Moved Permanently'
    case 302: return 'Found'
    case 303: return 'See Other'
    case 304: return 'Not Modified'
    case 305: return 'Use Proxy'
    case 306: return 'RESERVED in RFC 2616'
    case 307: return 'Temporary Redirect'
    case 308: return 'Permanent Redirect'

    case 400: return 'Bad Request'
    case 401: return 'Unauthorized'
    case 402: return 'Payment Required'
    case 403: return 'Forbidden'
    case 404: return 'Not Found'
    case 405: return 'Method Not Allowed'
    case 406: return 'Not Acceptable'
    case 407: return 'Proxy Authentication Required'
    case 408: return 'Request Timeout'
    case 409: return 'Conflict'
    case 410: return 'Gone'
    case 411: return 'Length Required'
    case 412: return 'Precondition Failed'
    case 413: return 'Payload Too Large'
    case 414: return 'URI Too Long'
    case 415: return 'Unsupported Media Type'
    case 416: return 'Range Not Satisfiable'
    case 417: return 'Expectation Failed'
    case 418: return 'I’m a teapot'
    case 422: return 'Unprocessable Entity'
    case 423: return 'Locked'
    case 424: return 'Failed Dependency'
    case 426: return 'Upgrade Required'
    case 428: return 'Precondition Required'
    case 429: return 'Too Many Requests'
    case 431: return 'Request Header Fields Too Large'
    case 434: return 'Requested host unavailable'
    case 449: return 'Retry With'
    case 451: return 'Unavailable For Legal Reasons'

    case 500: return 'Internal Server Error'
    case 501: return 'Not Implemented'
    case 502: return 'Bad Gateway'
    case 503: return 'Service Unavailable'
    case 504: return 'Gateway Timeout'
    case 505: return 'HTTP Version Not Supported'
    case 506: return 'Variant Also Negotiates'
    case 507: return 'Insufficient Storage'
    case 509: return 'Bandwidth Limit Exceeded'
    case 510: return 'Not Extended'
    case 511: return 'Network Authentication Required'
    case 520: return 'Unknown Error'
    case 521: return 'Web Server Is Down'
    case 522: return 'Connection Timed Out'
    case 523: return 'Origin Is Unreachable'
    case 524: return 'A Timeout Occurred'
    case 525: return 'SSL Handshake Failed'
    case 526: return 'Invalid SSL Certificate'

    default: return 'Unknown HTTP error'
  }
}

export default class HTTPError extends Error {
  httpStatusCode: number
  httpStatusMessage: string

  static fromCatch(error: Error) {
    if (error instanceof HTTPError) return error

    return new HTTPError(500, error)
  }

  constructor(httpStatusCode: number, error: Error | string) {
    if (error instanceof Error) {
      super(error.message)

      this.name = error.name
      this.fileName = error.fileName
      this.lineNumber = error.lineNumber
      this.columnNumber = error.columnNumber
      this.stack = error.stack
    } else {
      super(error)
    }

    this.name = 'HTTPError'
    this.httpStatusCode = httpStatusCode
    this.httpStatusMessage = getHTTPStatusMessage(httpStatusCode)
  }
}
