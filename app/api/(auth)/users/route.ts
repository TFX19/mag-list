import { NextResponse } from "next/server";

export const GET = () => 
{
    return new NextResponse("First API with next.");
};