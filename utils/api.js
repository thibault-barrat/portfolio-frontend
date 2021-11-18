import axios from 'axios';

// Get the strapi URL from the environment or use localhost
export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

// GET requests to Strapi with axios
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  try {
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

// POST requests to Strapi with axios
export async function postAPI(path, postData) {
  const requestUrl = getStrapiURL(path);
  try {
    const response = await axios.post(requestUrl, postData);
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // and the response contains an error message
      throw new Error(error.response.data.message);
    }
    throw new Error(error);
  }
}
