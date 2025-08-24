import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
import { generateAdVariants } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productId: string | undefined = body?.productId;
    const style: string = body?.style ?? "Direct Response";

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variants = await generateAdVariants({ product, style, count: 3 });
    return NextResponse.json({ variants });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

