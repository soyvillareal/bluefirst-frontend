export default {
  NODE_ENV: process.env.NODE_ENV || "local",
  IS_DEV: ["development", "local"].includes(process.env.NODE_ENV),
  LOGO: `${process.env.NEXT_PUBLIC_BASE_CND_URL}/uploads/default-avatar.png`,
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  BASE_APP_URL: process.env.NEXT_PUBLIC_BASE_APP_URL,
  BASE_CND_URL: process.env.NEXT_PUBLIC_BASE_CND_URL,
} as const;
