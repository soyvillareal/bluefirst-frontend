import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isArray, isNotNilOrEmpty } from "ramda-adjunct";
import { SubmitHandler, useForm } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  EGender,
  useLoginMutation,
} from "@helpers/features/sessions/sessions.api";
import useAppDispatch from "@hooks/redux/useAppDispatch";
import spaceSizes from "@theme/spaceSizes";
import InputPassword from "@components/Form/InputPassword";
import AlertCard from "@components/AlertCard";
import Form from "@components/Form";
import { setSession } from "@helpers/features/sessions/sessions.slice";
import Input from "@components/Form/Input";
import { isValidEmail } from "@helpers/constants";
import useAppSelector from "@hooks/redux/useAppSelector";
import { useRouter } from "next/router";
import { selectIsUserLoggedIn } from "@helpers/features/sessions/sessions.selector";
import NextButtonLink from "@components/NextButtonLink";
import { useRegisterMutation } from "@helpers/features/sessions/sessions.api";
import PageContainer from "@components/Layout/PageContainer";
import { routes } from "@helpers/routes";
import { FormSelectAuto } from "@components/Form/FormSelectAuto";
import { genderOptions } from "./register.constants";
import { IErrorCode } from "@helpers/types";
import FileUpload from "@components/FileUpload";

interface ISignupInputs {
  firstName: string;
  lastName: string;
  username: string;
  file: File;
  email: string;
  password: string;
  birthdate: string;
  gender: EGender;
}

interface ISelectOptionGender {
  name: string;
  value: EGender;
}

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  if (isUserLoggedIn) {
    router.push(routes.home);
  }

  const [errorCode, setErrorCode] = useState<string | undefined>("");

  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [login, { isLoading: isLogging, isSuccess: hasLoggedIn }] =
    useLoginMutation();

  const methods = useForm<ISignupInputs>();
  const { setValue } = methods;

  const genderOptionsParsed = useMemo(() => {
    return genderOptions(t(`component.male`), t(`component.female`));
  }, [t]);

  useEffect(() => {
    setValue("gender", genderOptionsParsed[0].value as EGender);
  }, [setValue, genderOptionsParsed]);

  const onSubmit: SubmitHandler<ISignupInputs> = async (data) => {
    console.log(data);
    try {
      const res = await register({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        file: data.file,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate,
        gender: data.gender,
      }).unwrap();

      if (res) {
        const session = await login({
          loginId: data.email,
          password: data.password,
        }).unwrap();

        // Load session into the store
        dispatch(setSession(session));
      }
    } catch (error) {
      const err = (error as IErrorCode)?.data?.message;
      setErrorCode(isArray(err) ? err[0] : err);
      console.log(error);
    }
  };

  return (
    <PageContainer id="signupPage">
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={spaceSizes.md}
          width="350px"
        >
          <Typography fontWeight="bold" textAlign="center" variant="h5">
            {t(`component.signup_title`).toUpperCase()}
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <FileUpload name='file' />
          <Input
            errorMessage={t("error.firstName_error")}
            id="firstName"
            placeholder={t(`component.firstName`)}
          />
          <Input
            errorMessage={t("error.lastName_error")}
            id="lastName"
            placeholder={t(`component.lastName`)}
          />

          <Input
            errorMessage={t("error.username_error")}
            id="username"
            placeholder={t(`component.username`)}
          />

          <Input
            errorMessage={t("error.mail_error")}
            id="email"
            placeholder={t(`component.email`)}
            validate={isValidEmail}
          />
          <InputPassword id="password" placeholder={t(`component.password`)} />
          <InputPassword
            id="password_confirmation"
            match={methods.watch("password")}
            placeholder={t(`component.password_confirmation`)}
          />

          <FormSelectAuto
            defaultValue={genderOptionsParsed[0]}
            errorMessage={t("error.gender_error")}
            getOptionLabel={(option: ISelectOptionGender) => option.name ?? ""}
            id="gender"
            label={t(`component.gender`)}
            noOptionsText={t(`component.gender_no_options`)}
            options={genderOptionsParsed}
            placeholder={t(`component.gender_placeholder`)}
            onChange={(e, data: ISelectOptionGender) => {
              setValue("gender", data.value as EGender, {
                shouldValidate: true,
              });
            }}
            required
          />

          <Typography textAlign="left" variant="caption">
            {t(`component.password_requirements`)}
          </Typography>
          {isNotNilOrEmpty(errorCode) && (
            <AlertCard
              content={t(`error.${errorCode}`)}
              id="signupError"
              show={isNotNilOrEmpty(errorCode)}
            />
          )}
          <Stack spacing={spaceSizes.md} width="100%" alignItems="center">
            <LoadingButton
              data-testid="signupButton"
              disabled={isNotNilOrEmpty(methods.formState.errors)}
              loading={(isLoading && !isSuccess) || (isLogging && !hasLoggedIn)}
              size="large"
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
              }}
            >
              {t(`component.register`)}
            </LoadingButton>
            <NextButtonLink
              to={routes.register}
              variant="outlined"
              sx={{
                width: "100%",
              }}
            >
              {t(`component.login`)}
            </NextButtonLink>
          </Stack>
        </Stack>
      </Form>
    </PageContainer>
  );
};

export default SignUp;
