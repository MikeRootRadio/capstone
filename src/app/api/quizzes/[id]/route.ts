import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type IdParam = {
  params: { quizId: string };
};

export async function GET(request: Request, { params }: IdParam) {
  const id = parseInt(params.quizId);
  const data = await prisma.quizzes.findUnique({ where: { quizId: id } });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: IdParam) {
  const id = parseInt(params.quizId);
  let data = await request.json();
  data.id = id;
  await prisma.quizzes.update({ where: { quizId: id }, data });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: IdParam) {
  const id = parseInt(params.quizId);
  await prisma.quizzes.delete({ where: { quizId: id } });
  return NextResponse.json({
    deleted: id,
  });
}