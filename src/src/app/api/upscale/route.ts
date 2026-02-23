import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const scale = parseInt(formData.get("scale") as string) || 2;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (![2, 4].includes(scale)) {
            return NextResponse.json({ error: "Invalid scale factor. Use 2 or 4." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const originalImage = sharp(buffer);
        const metadata = await originalImage.metadata();

        if (!metadata.width || !metadata.height) {
            return NextResponse.json({ error: "Invalid image" }, { status: 400 });
        }

        // Limit maximum output dimensions to prevent server crash/timeout on huge images
        // e.g., 4000x4000 * 4x = 16000x16000 is very heavy.
        // Let's set a reasonable input limit or output limit.
        const MAX_OUTPUT_DIMENSION = 8192; // 8K

        if (metadata.width * scale > MAX_OUTPUT_DIMENSION || metadata.height * scale > MAX_OUTPUT_DIMENSION) {
            return NextResponse.json({ error: "Resulting image would be too large." }, { status: 400 });
        }

        const upscaledBuffer = await originalImage
            .resize({
                width: metadata.width * scale,
                kernel: sharp.kernel.lanczos3
            })
            .toBuffer();

        const contentType = file.type || "image/jpeg";
        const extension = contentType.split("/")[1] || "jpg";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([upscaledBuffer as any]), {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="upscaled-${scale}x-${file.name}"`,
                "Content-Length": upscaledBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("Upscale error:", error);
        return NextResponse.json(
            { error: "Failed to upscale image" },
            { status: 500 }
        );
    }
}
