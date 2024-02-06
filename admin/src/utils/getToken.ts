export const getToken = () => {
  return `Bearer ${JSON.parse(window.sessionStorage.jwtToken)}`;
};
