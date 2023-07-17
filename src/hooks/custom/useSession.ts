import { useCallback, useEffect, useState } from "react";

import { useAnonymousSessionMutation } from "@helpers/features/sessions/sessions.api";
import {
  selectIsUserLoggedIn,
  selectIsUserNeedsAnonymousSession,
} from "@helpers/features/sessions/sessions.selector";
import {
  loadSession,
  setSession,
} from "@helpers/features/sessions/sessions.slice";
import useAppDispatch from "@hooks/redux/useAppDispatch";
import useAppSelector from "@hooks/redux/useAppSelector";

type SessionStatus = "loading" | "success";

export default function useSession() {
  const dispatch = useAppDispatch();

  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("loading");

  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserNeedsAnonSession = useAppSelector(
    selectIsUserNeedsAnonymousSession
  );
  const [getAnonymousSession, { isLoading: isLoadingAnonymousSession }] =
    useAnonymousSessionMutation();

  const loadAnonymousSession = useCallback(async () => {
    if (isUserNeedsAnonSession) {
      if (sessionStatus === "loading" && !isLoadingAnonymousSession) {
        // load session from api
        const anonSession = await getAnonymousSession({
          seed: "empty",
        }).unwrap();
        // set session in store
        dispatch(setSession(anonSession));
      }
    } else {
      dispatch(loadSession());
    }
  }, [
    dispatch,
    getAnonymousSession,
    isUserNeedsAnonSession,
    isLoadingAnonymousSession,
    sessionStatus,
  ]);

  const loadAuthSession = useCallback(() => {
    dispatch(loadSession());
    setSessionStatus("success");
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("LO NECESITAAAAAAAAAAAAAAAAAA???");
      loadAuthSession();
    } else {
      loadAnonymousSession();
    }
  }, [isLoggedIn, loadAuthSession, loadAnonymousSession]);
}
