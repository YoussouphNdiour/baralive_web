//@ts-nocheck
import React from "react";
import SEO from "components/seo";
import { useQuery } from "react-query";
import useLocale from "hooks/useLocale";
import parcelService from "services/parcel";
import ShopForm from "components/shopForm/shopForm";
import { ParcelType } from "interfaces/parcel.interface";
import ParcelForm from "components/parcelForm/parcelForm";
import ParcelSenderForm from "components/parcelForm/parcelSender";
import ParcelReceiverForm from "components/parcelForm/parcelReceiver";
import ParcelCheckoutContainer from "containers/parcelCheckout/parcelCheckout";

type Props = {};

export default function ParcelCheckout({}: Props) {
  const { t } = useLocale();

  const { data: types } = useQuery("parcelTypes", () =>
    parcelService.getAllTypes()
  );

  const { data: payments } = useQuery("payments", () =>
    paymentService.getAll()
  );

  const formatCategories = (list: ParcelType[] = []) => {
    if (!list.length) {
      return [];
    }
    return list.map((item) => ({
      label: item.type || t(item.tag),
      value: item.id,
      data: item,
    }));
  };

  return (
    <>
      <SEO />
      <ParcelCheckoutContainer>
        <ShopForm title={t("sender.details")} xs={12} md={8}>
          <ParcelSenderForm />
        </ShopForm>
        <ShopForm title={t("parcel.details")} xs={12} md={4} sticky>
          <ParcelForm
            types={formatCategories(types?.data)}
            payments={formatCategories(payments?.data)}
          />
        </ShopForm>
        <ShopForm title={t("receiver.details")} xs={12} md={8}>
          <ParcelReceiverForm />
        </ShopForm>
      </ParcelCheckoutContainer>
    </>
  );
}
