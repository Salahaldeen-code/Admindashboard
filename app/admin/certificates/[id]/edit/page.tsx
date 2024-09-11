import CertificatesForm from "@/app/admin/Components/CreateNew/Certificates/CertificatesForm";
import PartnersForm from "@/app/admin/Components/CreateNew/Partner/partnerForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditCertifates = async ({ params }: Props) => {
  const certificates = await prisma.certificates.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!certificates) notFound();
  return <CertificatesForm certificates={certificates}></CertificatesForm>;
};

export default EditCertifates;
