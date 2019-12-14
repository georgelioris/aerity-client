import axios from 'axios';

export default async (url, { ...params }) => {
  const result = await axios.get(url, params);
  return result.data;
};
