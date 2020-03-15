import axios from 'axios';

/**
 * Status Codes
 */
const HTTP_200_OK = 200;
const HTTP_300_MULTIPLE_CHOICES = 300;
const HTTP_204_NO_CONTENT = 204;

const checkRequestStatus = response => {
  if (response.status === HTTP_204_NO_CONTENT) return {};

  if (
    response.status >= HTTP_200_OK &&
    response.status < HTTP_300_MULTIPLE_CHOICES
  ) {
    return response.data;
  }
};

async function request(url, method, options) {
  const response = await axios({
    url,
    method,
    ...options
  });
  return checkRequestStatus(response);
}

export default request;
