import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const simulateFailure = body.simulateFailure === true;

    // Simulate required 1500ms processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (simulateFailure) {
      return NextResponse.json(
        { success: false, error: "Payment gateway error: Transaction declined" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        message: "Checkout completed successfully",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
