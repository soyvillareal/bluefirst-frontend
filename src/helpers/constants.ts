import { getStorage } from "./storage";

const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^\+[1-9]\d{1,14}$/;
const passwordRegex = /^(?=.*[A-Z\u00C0-\u00DC])(?=.*\d)[\w\W]{8,80}$/;
const nameRegex = /^[^#&*[\]()=<^>%${},\\!/]{0,30}$/;

export const logoWidth = 40;
export const logoHeight = 40;

export const isValidEmail = (value: string) =>
  mailRegex.test(value?.trim().toLocaleLowerCase() || "");

export const isValidCellphone = (value: string) => phoneRegex.test(value);

export const isValidPassword = (value: string) => passwordRegex.test(value);

export const isValidName = (value: string) => nameRegex.test(value);

export const getJWT = () => {
  const session = getStorage()?.getItem("session");

  if (session) {
    return JSON.parse(session).jwt;
  }

  return null;
};

export const normalizeSlug = (value?: string) =>
  value?.replace(/\s|-/g, "_").toLowerCase();
