import { RTKTagsAsArray, api } from "@helpers/api";
import env from "@helpers/env";
import { IUserInList } from "../users/users.api";

export enum ESessionType {
  ANONYMOUS = "anonymous",
  AUTH = "auth",
}

export interface CommonSessionData {
  id: string;
  type: ESessionType;
  jwt: string;
  expired_at: Date;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar: string;
  lang: string;
  country: string;
  linkedin: string;
  github: string;
  facebook: string;
  instagram: string;
  updated_at: string;
  created_at: string;
}

export interface AuthenticatedSessionResponse extends CommonSessionData {
  user: IUser;
}

export interface AuthenticatedSessionRequest {
  loginId: string;
  password: string;
}

export enum EGender {
  MALE = "male",
  FEMALE = "female",
}

export interface IRegisterUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  file: File;
  email: string;
  password: string;
  birthdate: string;
  gender: EGender;
}

export interface AnonymousSessionRequest {
  seed: string;
}

export const sessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    anonymousSession: builder.mutation<
      CommonSessionData,
      AnonymousSessionRequest
    >({
      query: (request) => ({
        url: `${env.BASE_API_URL}/auth/anonymous-login`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: RTKTagsAsArray(), // This will invalidate all cache when user logs out
    }),
    login: builder.mutation<
      AuthenticatedSessionResponse,
      AuthenticatedSessionRequest
    >({
      query: ({ loginId, password }) => ({
        url: `${env.BASE_API_URL}/auth/login`,
        method: "POST",
        body: {
          loginId,
          password,
        },
      }),
    }),
    register: builder.mutation<IUserInList, IRegisterUserRequest>({
      query: ({ firstName, lastName, username, email, password, birthdate, gender, file }) => {
        const body = new FormData();
        body.append("file", file);
        body.append("firstName", firstName);
        body.append("lastName", lastName);
        body.append("username", username);
        body.append("email", email);
        body.append("password", password);
        body.append("birthdate", birthdate);
        body.append("gender", gender);

        return {
          url: `${env.BASE_API_URL}/auth/register`,
          method: "POST",
          body,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAnonymousSessionMutation,
} = sessionsApi;
