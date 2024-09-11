import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');


export async function GET(request: NextRequest) {
  try {
    // Fetch all   and generalInfo from the generalInfo  table
    const generalInfo = await prisma.generalInfo.findMany();
    return NextResponse.json(generalInfo, { status: 200 });
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
    const key = body.get('key') as string;
    const value = body.get('value') as string;
    // const validation = creategeneralInfo Schema.safeParse(body)

    // if(!validation.success) 
    //   return NextResponse.json(validation.error.format(), {status: 400});

       
    // Insert new generalInfo    into the generalInfo  table
    const newgeneralInfo = await prisma.generalInfo.create({
      data: {
        title,
        key,
        value,
      },
    });

    return NextResponse.json(newgeneralInfo, { status: 201 });
}