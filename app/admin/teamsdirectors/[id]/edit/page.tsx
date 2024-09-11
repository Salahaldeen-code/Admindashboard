import TeamsDirectorsForm from "@/app/admin/Components/CreateNew/TeamOrDirectors/TeamDirectorsForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditTeamsDirectors = async ({ params }: Props) => {
  const teamsDirector = await prisma.teamOrDirectors.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!teamsDirector) notFound();
  return (
    <TeamsDirectorsForm teamsDirectors={teamsDirector}></TeamsDirectorsForm>
  );
};

export default EditTeamsDirectors;
