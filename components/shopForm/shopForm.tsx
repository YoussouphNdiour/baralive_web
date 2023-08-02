import React from "react";
import cls from "./shopForm.module.scss";
import { FormikProps } from "formik";
import { ShopFormType } from "interfaces";
import { Grid, useMediaQuery } from "@mui/material";

type Props = {
  children?: any;
  lang?: string;
  formik?: FormikProps<ShopFormType>;
  loading?: boolean;
  xs?: number;
  md?: number;
  lg?: number;
  title?: string;
  sticky?: boolean;
};

export default function ShopForm({
  children,
  formik,
  lang,
  xs,
  md,
  lg,
  title,
  loading,
  sticky,
}: Props) {
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <Grid
      item
      xs={xs}
      md={md}
      lg={lg}
      order={sticky && !isDesktop ? 2 : undefined}
    >
      <div className={sticky ? cls.sticky : ""}>
        <div className={cls.wrapper}>
          {!!title && (
            <div className={cls.header}>
              <h3 className={cls.title}>{title}</h3>
            </div>
          )}
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { formik, lang, loading });
          })}
        </div>
      </div>
    </Grid>
  );
}
