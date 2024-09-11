import ServicesFormForm from "@/app/admin/Components/CreateNew/Services/ServicesForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditServices = async ({ params }: Props) => {
  const services = await prisma.services.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!services) notFound();
  return <ServicesFormForm services={services}></ServicesFormForm>;
};

export default EditServices;
