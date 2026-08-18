import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { auth } from "@/lib/auth";

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

export async function DELETE(request: Request) {
  const session = await auth();

  // Server-side RBAC Verification: Reject non-admin calls with 403 Forbidden
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Admin role required for delete operation" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");

  return NextResponse.json(
    {
      success: true,
      message: `Product ${productId || ""} deleted successfully by Admin`,
    },
    { status: 200 }
  );
}
