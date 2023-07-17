import { NextLinkComposed } from "@components/Link";
import { Button, ButtonProps } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface INextButtonLinkProps extends ButtonProps {
  to: string;
}

const NextButtonLink = ({ to, children, ...props }: PropsWithChildren<INextButtonLinkProps>) => {
  return (
    <NextLinkComposed to={to} style={{
      width: "100%",
    }}>
      <Button {...props}>{children}</Button>
    </NextLinkComposed>
  );
};

export default NextButtonLink;
