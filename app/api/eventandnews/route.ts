import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all Events and News from the newsevents table
    const newsEvents = await prisma.newsEvents.findMany();
    return NextResponse.json(newsEvents, { status: 200 });
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
    const title = body.get('title') as string;
    const description = body.get('description') as string;
    const date = body.get('date') as string;
    const short_description = body.get('short_description') as string;
    const imageFile = body.get('image') as File | null;
    // const validation = createNewsEventsSchema.safeParse(body)

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

    // Insert new news and events into the newsEvents table
    const newNewsEvent = await prisma.newsEvents.create({
      data: {
        title,
        description,
        short_description,
        date,
        image: imageUrl,
      },
    });

    return NextResponse.json(newNewsEvent, { status: 201 });
}