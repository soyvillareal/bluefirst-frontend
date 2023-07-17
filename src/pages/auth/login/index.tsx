import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { isNotNilOrEmpty } from "ramda-adjunct";
import { Button, Divider, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SubmitHandler, useForm } from "react-hook-form";

import useAppDispatch from "@hooks/redux/useAppDispatch";
import { useLoginMutation } from "@helpers/features/sessions/sessions.api";
import { setSession } from "@helpers/features/sessions/sessions.slice";
import Form from "@components/Form";
import spaceSizes from "@theme/spaceSizes";
import Input from "@components/Form/Input";
import InputPassword from "@components/Form/InputPassword";
import AlertCard from "@components/AlertCard";
import PageContainer from "@components/Layout/PageContainer";
import { routes } from "@helpers/routes";
import { ScriptProps } from "next/script";
import { useRouter } from "next/router";
import useAppSelector from "@hooks/redux/useAppSelector";
import { selectIsUserLoggedIn } from "@helpers/features/sessions/sessions.selector";
import NextButtonLink from "@components/NextButtonLink";

interface Inputs {
  loginId: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const [errorCode, setErrorCode] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  if (isUserLoggedIn) {
    router.push(routes.home);
  }

  // Hook to call API for login
  const [signIn, { isLoading, isSuccess }] = useLoginMutation();

  // Inputs interface
  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const session = await signIn({
        loginId: data.loginId,
        password: data.password,
      }).unwrap();

      // Load session into the store
      dispatch(setSession(session));
    } catch (error) {
      setErrorCode("credentials_error");
    }
  };

  return (
    <PageContainer id="loginPage">
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={spaceSizes.md}
          width="350px"
        >
          <Typography fontWeight="bold" textAlign="center" variant="h5">
            {t(`component.login_title`).toUpperCase()}
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Input
            errorMessage={t("error.login_id_error")}
            id="loginId"
            placeholder={t("component.login_id")}
          />
          <InputPassword
            id="password"
            placeholder={t("component.password")}
            validate={false}
          />
          {isNotNilOrEmpty(errorCode) && (
            <AlertCard
              content={t(`error.${errorCode}`)}
              id="loginError"
              show={isNotNilOrEmpty(errorCode)}
            />
          )}
          <Stack spacing={spaceSizes.md} width="100%">
            <LoadingButton
              data-testid="loginButton"
              disabled={isNotNilOrEmpty(methods.formState.errors)}
              loading={isLoading && !isSuccess}
              size="large"
              type="submit"
              variant="contained"
            >
              {t("component.login")}
            </LoadingButton>
            <NextButtonLink to={routes.register} data-testid="signupButton" variant="outlined" sx={{
              width: "100%"
            }}>
              {t("component.register")}
            </NextButtonLink>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
      </Form>
    </PageContainer>
  );
};

export default Login;
