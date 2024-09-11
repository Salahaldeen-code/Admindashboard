import NewsEventsForm from "@/app/admin/Components/CreateNew/EventAndNews/EventAndNewsForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditNewsEvents = async ({ params }: Props) => {
  const newsEvents = await prisma.newsEvents.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!newsEvents) notFound();
  return <NewsEventsForm newsEvents={newsEvents}></NewsEventsForm>;
};

export default EditNewsEvents;
