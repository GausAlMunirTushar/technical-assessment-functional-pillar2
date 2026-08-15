import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isError = searchParams.get("error") === "true";
  const isEmpty = searchParams.get("empty") === "true";

  // Simulate network latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (isError) {
    return NextResponse.json(
      { error: "Failed to fetch products from database" },
      { status: 500 }
    );
  }

  if (isEmpty) {
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(MOCK_PRODUCTS, { status: 200 });
}
