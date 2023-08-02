import React from "react";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import TextInput from "components/inputs/textInput";
import { FormikProps } from "formik";
import { ParcelFormValues, ParcelType } from "interfaces/parcel.interface";
import useLocale from "hooks/useLocale";
import RcDatePicker from "components/pickers/rcDatePicker";
import RcSelect from "components/pickers/rcSelect";
import PrimaryButton from "components/button/primaryButton";
import { useQuery } from "react-query";
import parcelService from "services/parcel";
import getTimeSlots from "utils/getTimeSlots";
import RcParcelPicker from "components/pickers/rcParcelPicker";
import { selectCurrency } from "redux/slices/currency";
import { useAppSelector } from "hooks/useRedux";

const Price = dynamic(() => import("components/price/price"), { ssr: false });

type Props = {
  formik: FormikProps<ParcelFormValues>;
  types: {
    label: string;
    value: string;
    data: ParcelType;
  }[];
  loading?: boolean;
  payments?: {
    label: string;
    value: string;
  }[];
};

export default function ParcelForm({
  formik,
  types,
  loading,
  payments,
}: Props) {
  const { t } = useLocale();
  const currency = useAppSelector(selectCurrency);
  const {
    location_from,
    location_to,
    type_id,
    delivery_date,
    delivery_time,
    note,
  } = formik.values;

  const { data: price, isLoading } = useQuery(
    ["calculateParcel", location_from, location_to, type_id, currency],
    () =>
      parcelService.calculate({
        address_from: location_from,
        address_to: location_to,
        type_id,
        currency_id: currency?.id,
      }),
    {
      enabled: Boolean(type_id),
      select: (data) => data.data.price,
    }
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <RcParcelPicker
          type="standard"
          name="type_id"
          label={t("type")}
          value={type_id}
          options={types}
          onChange={(event: any) => formik.handleChange(event)}
          error={!!formik.errors.type_id && formik.touched.type_id}
        />
      </Grid>
      <Grid item xs={12}>
        <RcDatePicker
          type="standard"
          name="delivery_date"
          label={t("delivery.date")}
          value={delivery_date}
          onChange={(event) => {
            formik.setFieldValue("delivery_date", event);
          }}
          error={!!formik.errors.delivery_date && formik.touched.delivery_date}
        />
      </Grid>
      <Grid item xs={12}>
        <RcSelect
          type="standard"
          name="delivery_time"
          label={t("delivery.time")}
          value={delivery_time}
          options={getTimeSlots("06:00", "23:00", false, 60).map((el) => ({
            label: el,
            value: el,
          }))}
          onChange={(event: any) => formik.handleChange(event)}
          error={!!formik.errors.delivery_time && formik.touched.delivery_time}
        />
      </Grid>
      <Grid item xs={12}>
        <RcSelect
          type="standard"
          name="payment_type_id"
          label={t("payment.type")}
          value={formik.values.payment_type_id}
          options={payments}
          onChange={(event: any) => formik.handleChange(event)}
          error={
            !!formik.errors.payment_type_id && formik.touched.payment_type_id
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="note"
          label={t("note")}
          value={note}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.note && formik.touched.note}
        />
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          type="submit"
          disabled={!price}
          loading={isLoading || loading}
        >
          {t("pay")} <Price number={price} />
        </PrimaryButton>
      </Grid>
    </Grid>
  );
}
