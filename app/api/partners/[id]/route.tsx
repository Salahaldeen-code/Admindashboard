import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../component/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.formData();
  const name = body.get("name") as string;
  const imageFile = body.get("logo") as File | null;

  // if(!validation.success)
  //   return NextResponse.json(validation.error.format(), {status: 400});

  const partners = await prisma.partners.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!partners)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // Validate the required fields
  if (!imageFile) {
    return NextResponse.json(
      { error: "Title, description, image, and icon are required" },
      { status: 400 }
    );
  }
  // Function to save a file
  const saveFile = async (file: File): Promise<string> => {
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);
    const writeStream = fs.createWriteStream(filePath);
    const reader = file.stream().getReader();

    // Write file chunks to disk
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      writeStream.write(Buffer.from(value));
    }
    writeStream.end();

    return `/uploads/${uniqueFileName}`;
  };

  // Save files and get their URLs
  const imageUrl = await saveFile(imageFile);

  const updatedPartners = await prisma.partners.update({
    where: { id: partners.id },
    data: {
      name,
      logo: imageUrl,
    },
  });
  return NextResponse.json(updatedPartners);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const Partners = await prisma.partners.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!Partners)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  await prisma.partners.delete({
    where: { id: Partners.id },
  });

  return NextResponse.json({});
}
