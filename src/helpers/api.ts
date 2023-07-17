import { createApi } from '@reduxjs/toolkit/query/react';
import { values } from 'ramda';

import { baseQuery } from './baseQuery';

// Validate or invalidate cache by tags after a mutation
export const RTKTags = {
  // ProfileByCatOrSubCat: "ProfileByCatOrSubCat",
};

export const RTKTagsAsArray = () => values(RTKTags);

export const api = createApi({
  reducerPath: 'api',
  tagTypes: RTKTagsAsArray(),
  baseQuery,
  // By default the invalidation Cache time is 60 seg.
  keepUnusedDataFor: 60,
  // Re-validate all data when user comes from off-line mode.
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
