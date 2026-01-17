import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const quality = parseInt(formData.get("quality") as string) || 80;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const originalType = file.type;
        let pipeline = sharp(buffer);
        let contentType = originalType;
        let extension = "";

        // Determine output format based on input
        if (originalType === "image/jpeg" || originalType === "image/jpg") {
            pipeline = pipeline.jpeg({ quality, mozjpeg: true });
            contentType = "image/jpeg";
            extension = "jpg";
        } else if (originalType === "image/png") {
            // PNG compression is different. 'quality' maps to palette quantization or compression level.
            // Sharp png() 'quality' requires `palette: true` for significant size reduction similar to lossy.
            pipeline = pipeline.png({
                quality,
                compressionLevel: 9,
                palette: true
            });
            contentType = "image/png";
            extension = "png";
        } else if (originalType === "image/webp") {
            pipeline = pipeline.webp({ quality });
            contentType = "image/webp";
            extension = "webp";
        } else {
            // Fallback or force convert to WebP?
            // For "Compress Image" generic tool, usually we keep format.
            // If unsupported format, return error.
            return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
        }

        const compressedBuffer = await pipeline.toBuffer();

        // Return the file as a Blob/Stream
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([compressedBuffer as any]), {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="compressed.${extension}"`,
                "Content-Length": compressedBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("Compression error:", error);
        return NextResponse.json(
            { error: "Failed to compress image" },
            { status: 500 }
        );
    }
}
