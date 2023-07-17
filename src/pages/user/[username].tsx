import { selectIsUserLoggedIn } from "@helpers/features/sessions/sessions.selector";
import useAppSelector from "@hooks/redux/useAppSelector";
import { Stack } from "@mui/material";

const User = () => {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn)

  return <Stack>Testttt</Stack>;
};

export default User;
