class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.name = "ForbiddenError";
    }
  }
  
  export default ForbiddenError;
  
  /**
   * A Forbidden Error typically refers to an HTTP status code 403,
   *  which indicates that the server understands the request but refuses to authorize it.
   *  This error is commonly used in web applications to signal that the user does not have 
   *  the necessary permissions to access a particular resource.
   */