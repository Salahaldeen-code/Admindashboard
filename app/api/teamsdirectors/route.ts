import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and Services from the Services  table
    const teamsDirectors = await prisma.teamOrDirectors.findMany();
    return NextResponse.json(teamsDirectors, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {

      // Check if the upload directory exists, if not create it
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

    // Parse formData from the request
    const body = await request.formData();
    const name = body.get('name') as string;
    const position = body.get('position') as string;
    const bio = body.get('bio') as string;
    const imageFile = body.get('image') as File | null;
    // const validation = createServices Schema.safeParse(body)

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

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

    // Insert new Services    into the Services  table
    const newTeamsDirectors = await prisma.teamOrDirectors.create({
      data: {
        name,
        position,
        bio,
        image: imageUrl,
      },
    });

    return NextResponse.json(newTeamsDirectors, { status: 201 });
}