export function handleResponse(response) {
    if (response.data.data) {
      return response.data.data;
    }
  
    if (response.data) {
      return response.data;
    }
  
    return response;
  }

  export function handleError(error) {
     if (error.response.data.message) {
      throw error.response.data.message;
    }
    throw error;
  }