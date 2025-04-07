// app/api/countries/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all",{
      cache: "no-store", 
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}
