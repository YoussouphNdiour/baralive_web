import React, { useRef } from "react";
import cls from "./parcelForm.module.scss";
import { Grid } from "@mui/material";
import TextInput from "components/inputs/textInput";
import { FormikProps } from "formik";
import { ParcelFormValues } from "interfaces/parcel.interface";
import useLocale from "hooks/useLocale";
import Map from "components/map/map";

type Props = {
  formik: FormikProps<ParcelFormValues>;
};

export default function ParcelSenderForm({ formik }: Props) {
  const { t } = useLocale();
  const { username_from, phone_from, address_from, location_from } =
    formik.values;
  const inputRef = useRef<HTMLInputElement>(null);

  const locationObj = {
    lat: Number(location_from?.latitude) || 0,
    lng: Number(location_from?.longitude) || 0,
  };

  function setLocation(latlng: any) {
    formik.setFieldValue("location_from", {
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  }

  function setAddress(text?: string) {
    formik.setFieldValue("address_from", text);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextInput
          name="username_from"
          label={t("username")}
          value={username_from}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.username_from && formik.touched.username_from}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="phone_from"
          label={t("phone")}
          value={phone_from}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.phone_from && formik.touched.phone_from}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="address_from"
          label={t("address")}
          defaultValue={address_from}
          placeholder={t("type.here")}
          inputRef={inputRef}
          error={!!formik.errors.address_from && formik.touched.address_from}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextInput
          name="house_from"
          label={t("house")}
          value={formik.values.house_from}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.house_from && formik.touched.house_from}
        />
        <div className={cls.spacing} />
        <TextInput
          name="stage_from"
          label={t("stage")}
          value={formik.values.stage_from}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.stage_from && formik.touched.stage_from}
        />
        <div className={cls.spacing} />
        <TextInput
          name="room_from"
          label={t("room")}
          value={formik.values.room_from}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.room_from && formik.touched.room_from}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <div className={cls.map}>
          <Map
            location={locationObj}
            setLocation={setLocation}
            inputRef={inputRef}
            setAddress={setAddress}
          />
        </div>
      </Grid>
    </Grid>
  );
}
