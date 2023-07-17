import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import spaceSizes from "@theme/spaceSizes";
import { useMediumDesktopQuery } from "@hooks/mediaQuery/useMediumDesktopQuery";
import ResizeImage from "@components/ResizeImage";
import ItemContainer from "@components/Layout/ItemContainer";
import env from "@helpers/env";
import { logoHeight, logoWidth } from "@helpers/constants";
import useAppSelector from "@hooks/redux/useAppSelector";

import MenuItem from "./MenuItem";
import { CATEGORIES } from "./HeaderDesktop.constants";
import AuthItem from "./AuthItem";
import UserMenu from "./UserMenu";
import { routes } from "@helpers/routes";
import { selectIsUserLoggedIn } from "@helpers/features/sessions/sessions.selector";
import LangMenu from "@components/LangMenu";

export interface CategoryOrSubCategoryResponse {
  i18key: string;
  logo: string;
  slug: string;
  hasSubcategories?: boolean;
}

const HeaderDesktop = () => {
  const { t } = useTranslation();

  const isLoggedUser = useAppSelector(selectIsUserLoggedIn);

  const isMediumDesktop = useMediumDesktopQuery();

  return (
    <Stack
      alignContent="center"
      direction="row"
      justifyContent="flex-start"
      spacing={spaceSizes.md}
      sx={{ px: spaceSizes.sm, height: 40 }}
    >
      <Stack alignContent="center" justifyContent="center">
        <ResizeImage width={logoWidth} height={logoHeight} src={env.LOGO} />
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={isMediumDesktop ? spaceSizes.md : spaceSizes.sm}
        width="100%"
      >
        <Stack direction="row" alignItems="center" spacing={spaceSizes.sm}>
          <ItemContainer loading={false} isError={false}>
            <Stack alignItems="center" direction="row" spacing={spaceSizes.md}>
              {CATEGORIES.slice(0, 4).map(
                (category: CategoryOrSubCategoryResponse) => (
                  <MenuItem
                    data-testid={`${category.i18key}ButtonHeader`}
                    key={category.i18key}
                    text={t(`component.${category.i18key}`)}
                    to={category.slug}
                  />
                )
              )}
            </Stack>
          </ItemContainer>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={spaceSizes.sm}>
          {isLoggedUser ? (
            <UserMenu />
          ) : (
            <>
              <AuthItem text={t("component.login")} to={routes.login} />
              <AuthItem text={t("component.register")} to={routes.register} />
            </>
          )}
          <LangMenu />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeaderDesktop;
