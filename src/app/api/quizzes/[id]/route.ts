import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

/*
type IdParam = {
  params: { quizId: string };
};

export async function GET(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  const data = await prisma.quiz.findUnique({ where: { id } });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  let data = await request.json();
  data.id = id;
  await prisma.quizzes.update({ where: { quizId }, data });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  await prisma.quizzes.delete({ where: { id } });
  return NextResponse.json({
    deleted: id,
  });
}
*/