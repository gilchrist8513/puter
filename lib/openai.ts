import OpenAI from "openai";
import type { Product } from "./products";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey
  ? new OpenAI({ apiKey })
  : null;

type GenerateParams = {
  product: Product;
  style: string;
  count?: number;
};

export async function generateAdVariants({ product, style, count = 3 }: GenerateParams) {
  // Fallback to mock if no API key
  if (!openai) {
    return generateMockVariants(product, style, count);
  }

  const system = `You are a seasoned direct-response copywriter. Generate short, punchy ad copy.`;
  const user = `Product: ${product.name}
Category: ${product.category}
Description: ${product.description}
Price: $${product.price} (Cost: $${product.cost}, Margin: ${product.marginPct}%)
Ad Style: ${style}

Write ${count} unique ad variants. Each variant should have:
- Headline (max 10 words)
- Body (2-3 short sentences)
Return JSON with { variants: [{ headline, body }] }.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed?.variants)) return parsed.variants;
    return generateMockVariants(product, style, count);
  } catch (err) {
    return generateMockVariants(product, style, count);
  }
}

function generateMockVariants(product: Product, style: string, count: number) {
  const base = `${product.name} — ${style}`;
  const bodies = [
    `Meet ${product.name}. Loved for ${product.description.split(".")[0].toLowerCase()}. Get yours today!`,
    `Why ${product.name}? High heat score and great margins mean it just sells. Try it now.`,
    `Make life easier with ${product.name}. Quick ship. Risk-free. Tap to shop.`,
  ];
  return new Array(count).fill(null).map((_, i) => ({
    headline: `${base} ${i + 1}`,
    body: bodies[i % bodies.length],
  }));
}

