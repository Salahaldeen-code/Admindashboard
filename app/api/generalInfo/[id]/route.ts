import { NextRequest, NextResponse } from "next/server";
import { createNewsEventsSchema } from "../../../component/CreateNew/EventAndNews/ValidationSchema";
import prisma from "@/prisma/client";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function PATCH(request: NextRequest, {params}: {params:{id:string,}}){
    const body = await request.formData();
    const title = body.get('title') as string;
    const key = body.get('key') as string;
    const value = body.get('value') as string;



    const updateGenaralInfo = await prisma.generalInfo.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!updateGenaralInfo) return NextResponse.json({error:'Invalid Issue'}, {status: 404});

    
        const updatedGenralInfo = await prisma.generalInfo.update({
            where: {id: updateGenaralInfo.id},
            data: {
                title,
                key,
                value,
            }
        })
        return NextResponse.json(updatedGenralInfo);
    }
    
    export async function DELETE(request: NextRequest, {params}: {params:{id:string,}}){ 
            const generalInfo = await prisma.generalInfo.findUnique({
                where: {id: parseInt(params.id)}
            })
            if(!generalInfo) return NextResponse.json({error:'Invalid Issue'}, {status: 404});
    
            await prisma.generalInfo.delete({
                where: {id: generalInfo.id}
            })
    
            return NextResponse.json({});
    }