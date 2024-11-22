import { db } from "@/app/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

 export const GET = () => 
{
    return new NextResponse("First API with next.");
};

 export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if(existingUserByEmail){
            return NextResponse.json(
            {
                user: null, message: "User with this email already exists"
            },
            {
                status: 409
            });
        }

        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if(existingUserByUsername){
            return NextResponse.json(
            {
                user: null, message: "User with this username already exists"
            },
            {
                status: 409
            });
        }

        const hashedPassword = await hash(password, 10);
        
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser; //uma questão de segurança

        return NextResponse.json({ user: rest, message:"User created"}, { status: 201});
    } catch {
        return NextResponse.json({ message:"Something went wrong"}, { status: 500});
    } 
}