import Cookies from 'universal-cookie';

export const setCookie = (
  key: string,
  value: unknown,
  expires: Date | undefined,
) => {
  const cookies = new Cookies();
  const current = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(current.getFullYear() + 1);
  cookies.set(key, value, {
    path: '/',
    domain: window.location.hostname,
    expires: expires ?? nextYear,
  });
};

export const getCookie = (key: string) => {
  const cookies = new Cookies();
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  const cookies = new Cookies();
  return cookies.remove(key);
};
