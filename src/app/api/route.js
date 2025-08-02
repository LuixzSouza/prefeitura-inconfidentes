import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Importa o objeto 'db' do outro arquivo

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM users');
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}