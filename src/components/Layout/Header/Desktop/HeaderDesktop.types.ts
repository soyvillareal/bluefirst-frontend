import { CategoryOrSubCategoryResponse } from '.';

export interface LayoutMenuItemDesktopProps {
  text: string;
  to?: string;
  onClickCallback?: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  >;
  endIcon?: React.ReactNode | undefined;
  forceActive?: boolean | undefined;
  disabled?: boolean | undefined;
}

export interface LayoutMenuSubcategoryDesktopProps {
  categories?: Array<CategoryOrSubCategoryResponse>;
}
