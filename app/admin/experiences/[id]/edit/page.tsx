import ExperiencesForm from "@/app/admin/Components/CreateNew/Experience/ExperienceForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditNewsEvents = async ({ params }: Props) => {
  const experiences = await prisma.experiences.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!experiences) notFound();
  return <ExperiencesForm experiences={experiences}></ExperiencesForm>;
};

export default EditNewsEvents;
