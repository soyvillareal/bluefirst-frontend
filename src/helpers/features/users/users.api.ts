import { RTKTagsAsArray, api } from "@helpers/api";
import env from "@helpers/env";

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

export interface IUserInList {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  birthdate: string;
  gender: string;
  updatedAt: string;
  createdAt: string;
}

export interface IGetAllUsersResponse {
  data: IUserInList[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

enum EOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IGetAllUsersRequest {
  page: number;
  take: number;
  order?: EOrder;
}

interface IGetUserRequest {
  id: string;
}

export const sessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IGetAllUsersResponse, IGetAllUsersRequest>({
      query: ({ page, take, order }) => ({
        url: `${env.BASE_API_URL}/users/get-all`,
        method: "GET",
        params: {
          page,
          take,
          order,
        },
      }),
    }),
    getUser: builder.query<IUserInList, IGetUserRequest>({
      query: ({ id }) => ({
        url: `${env.BASE_API_URL}/users/get-account/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<IUserInList, IGetUserRequest>({
      query: ({ id }) => ({
        url: `${env.BASE_API_URL}/users/update-account/${id}`,
        method: "POST",
      }),
      invalidatesTags: RTKTagsAsArray(),
    }),
    deleteUser: builder.mutation<void | string, IGetUserRequest>({
      query: ({ id }) => ({
        url: `${env.BASE_API_URL}/users/delete-account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: RTKTagsAsArray(),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = sessionsApi;
