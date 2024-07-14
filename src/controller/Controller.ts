const controller = {
  /**
   * Returns a response object with code 200, status "OK", and data including a success message and a token.
   *
   * @param {any} token - the token used for the response
   * @return {object} the response object with code, status, and data
   */
  response: (token: string) => {
    return {
      code: 200,
      status: "OK",
      data: {
        message: "Success to login",
        token: token,
      },
    };
  },

  responseMhs: (mahasiswa: any, token: string) => {
    return {
      code: 200,
      status: "OK",
      data: {
        message: "Success to login",
        id_mahasiswa: mahasiswa.id,
        token: token,
      },
    };
  },

  /**
   * A function that generates a response error object based on the given code and optional errors.
   *
   * @param {Number} code - the error code
   * @param {Object} errors - (optional) additional error details
   * @return {Object} the response error object with code, status, and optional errors
   */
  responseError: (code: Number, errors?: Object) => {
    let status;
    switch (code) {
      case 400:
        status = "BAD REQUEST";
        break;
      default:
        break;
    }
    return {
      code: code,
      status: status,
      errors,
    };
  },
};

export default controller;
