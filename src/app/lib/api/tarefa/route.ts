import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db";

export async function GET(req: NextRequest, res: NextResponse){
  const db = await prisma.tarefa.findMany()

  return Response.json(db)
}


export async function POST(req: NextRequest, res: NextResponse){
  const name = await req.json()

 await prisma.tarefa.create({
  data: {
    name,
    completend: false
  }
 })

  return new Response()
}