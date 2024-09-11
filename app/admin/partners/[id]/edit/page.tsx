import PartnersForm from "@/app/admin/Components/CreateNew/Partner/partnerForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const Editpartners = async ({ params }: Props) => {
  const partners = await prisma.partners.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!partners) notFound();
  return <PartnersForm partners={partners}></PartnersForm>;
};

export default Editpartners;
