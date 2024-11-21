import { NextResponse } from "next/server";

export const GET = () => 
{
    return new NextResponse("First API with next.");
};

/* export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        const existingUserByEmail = await
    } catch (error) {
        
    } 
}*/