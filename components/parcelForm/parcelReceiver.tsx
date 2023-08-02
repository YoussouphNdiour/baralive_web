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

export default function ParcelReceiverForm({ formik }: Props) {
  const { t } = useLocale();
  const { username_to, phone_to, address_to, location_to } = formik.values;
  const inputRef = useRef<HTMLInputElement>(null);

  const locationObj = {
    lat: Number(location_to?.latitude) || 0,
    lng: Number(location_to?.longitude) || 0,
  };

  function setLocation(latlng: any) {
    formik.setFieldValue("location_to", {
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  }

  function setAddress(text?: string) {
    formik.setFieldValue("address_to", text);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextInput
          name="username_to"
          label={t("username")}
          value={username_to}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.username_to && formik.touched.username_to}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="phone_to"
          label={t("phone")}
          value={phone_to}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.phone_to && formik.touched.phone_to}
        />
      </Grid>
      <Grid item xs={12}>
        <TextInput
          name="address_to"
          label={t("address")}
          defaultValue={address_to}
          placeholder={t("type.here")}
          inputRef={inputRef}
          error={!!formik.errors.address_to && formik.touched.address_to}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextInput
          name="house_to"
          label={t("house")}
          value={formik.values.house_to}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.house_to && formik.touched.house_to}
        />
        <div className={cls.spacing} />
        <TextInput
          name="stage_to"
          label={t("stage")}
          value={formik.values.stage_to}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.stage_to && formik.touched.stage_to}
        />
        <div className={cls.spacing} />
        <TextInput
          name="room_to"
          label={t("room")}
          value={formik.values.room_to}
          onChange={formik.handleChange}
          placeholder={t("type.here")}
          error={!!formik.errors.room_to && formik.touched.room_to}
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
