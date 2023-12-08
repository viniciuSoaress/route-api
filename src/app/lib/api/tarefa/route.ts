import { NextRequest, NextResponse } from "next/server";
import prisma from "../../db";

export async function GET(req: NextRequest, res: NextResponse) {
  const db = await prisma.tarefa.findMany()

  res.status
  return Response.json(db)
}


export async function POST(req: NextRequest, res: NextResponse) {
  const name = await req.json()

  await prisma.tarefa.create({
    data: {
      name,
      completend: false
    }
  })

  res.status
  return new Response()
}


export async function PUT(req: NextRequest, res: NextResponse) {
  const { data, id } = await req.json()

 
  await prisma.tarefa.update({
    where: { id },
    data: data
  })
  return new Response()
}


export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = await req.json()

  await prisma.tarefa.delete({
    where: {
      id
    }
  })
  return new Response()
}
