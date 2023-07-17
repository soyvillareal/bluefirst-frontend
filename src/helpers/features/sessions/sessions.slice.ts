import { createSlice } from '@reduxjs/toolkit';
import { equals } from 'ramda';
import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct';
import Cookies from 'universal-cookie';

import { BaseSliceState } from '@helpers/types';

import { removeCookie, setCookie } from '../../cookie';
import { getStorage } from '../../storage';
import { IUser } from './sessions.api';

export interface SessionState extends BaseSliceState {
  user: IUser | null;
  isAnonymous: boolean;
}

const initialState = {
  user: null,
  isAnonymous: false,
  status: 'idle',
} as SessionState;

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadSession: (state) => {
      const localStorageSessionJSON = getStorage()?.getItem('session') || '';

      if (isNotNilOrEmpty(localStorageSessionJSON)) {
        const localSessionObject = JSON.parse(localStorageSessionJSON);
        const cookies = new Cookies();
        const expiredAt = new Date(localSessionObject.expiredAt);
        const today = new Date();

        if (
          equals(localSessionObject.id, cookies.get('session-id')) &&
          today <= expiredAt
        ) {
          // if session is an anonymous sessin, don't load user into store
          state.user = localSessionObject.user;
          state.status = 'succeeded';
        } else {
          state.status = 'pending';
        }
      } else {
        state.status = 'pending';
      }
    },
    setSession: (state, action) => {
      const session = action.payload;
      // Set session info
      setCookie(
        'session-id',
        JSON.stringify(session.id),
        new Date(session.expiredAt),
      );
      getStorage()?.setItem('session', JSON.stringify(session));
      state.user = session.user;
      state.isAnonymous = isNilOrEmpty(session.user);
      state.status = 'succeeded';
    },
    removeSession: (state) => {
      getStorage()?.clear();
      removeCookie('session-id');
      state.user = initialState.user;
      state.status = 'pending';
    },
  },
});

export const { loadSession, setSession, removeSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
