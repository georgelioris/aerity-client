export default async data => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return data;
};
