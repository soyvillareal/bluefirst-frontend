import { Button } from "@mui/material";
import { useCallback } from "react";
import { ArrowBackIosNew as ArrowBackIosNewIcon } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';


import { BackButtonProps } from "./BackButton.types";
import { useRouter } from "next/router";

const BackButton = ({ redirectingPath, onClick }: BackButtonProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const hasBackPage = false;

  // const hasBackPage = useMemo(() => {
  //   return location.key !== "default";
  // }, [location.key]);

  const handleClick = useCallback(() => {
    redirectingPath
      ? router.push(redirectingPath)
      : hasBackPage
      ? router.back()
      : router.push("/about");
  }, [redirectingPath, hasBackPage, router]);

  return (
    <Button
      startIcon={<ArrowBackIosNewIcon />}
      sx={{ justifyContent: "flex-start" }}
      onClick={onClick || handleClick}
    >
      {t(`component.back_button_title`)}
    </Button>
  );
};

export default BackButton;
