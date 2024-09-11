import GeneralInfoForm from "@/app/component/CreateNew/GeneralInfo/GeneralInfoForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditgeneralInfo = async ({ params }: Props) => {
  const generalInfo = await prisma.generalInfo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!generalInfo) notFound();
  return <GeneralInfoForm generalInfo={generalInfo}></GeneralInfoForm>;
};

export default EditgeneralInfo;
