import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../admin/Components/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const name = body.get('name') as string;
    const description = body.get('description') as string;
    const imageFile = body.get('image') as File | null;

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

    const newCertificates = await prisma.certificates.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!newCertificates) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

            // Validate the required fields
            if (!imageFile) {
                return NextResponse.json(
                  { error: 'Title, description, image, and icon are required' },
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
    
        const updatedCertificates = await prisma.certificates.update({
            where: {id: newCertificates.id},
            data: {
                name,
                description,
                image: imageUrl,
            }
        })
        return NextResponse.json(updatedCertificates);
    }
    
    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
            const newCertificates = await prisma.certificates.findUnique({
                where: {id: parseInt(params.id)}
            })
            if(!newCertificates) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
            await prisma.certificates.delete({
                where: {id: newCertificates.id}
            })
    
            return NextResponse.json({});
    }