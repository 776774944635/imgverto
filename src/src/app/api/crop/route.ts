import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const left = parseInt(formData.get("x") as string);
        const top = parseInt(formData.get("y") as string);
        const width = parseInt(formData.get("width") as string);
        const height = parseInt(formData.get("height") as string);

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
        if (isNaN(left) || isNaN(top) || isNaN(width) || isNaN(height)) {
            return NextResponse.json({ error: "Invalid crop dimensions" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const originalType = file.type;
        let pipeline = sharp(buffer);
        let contentType = originalType;
        let extension = "jpg";

        if (originalType === "image/png") {
            extension = "png";
            contentType = "image/png";
        } else if (originalType === "image/webp") {
            extension = "webp";
            contentType = "image/webp";
        }

        // Crop the image
        pipeline = pipeline.extract({ left, top, width, height });

        const croppedBuffer = await pipeline.toBuffer();

        return new NextResponse(new Blob([croppedBuffer as any]), {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="cropped-${width}x${height}.${extension}"`,
                "Content-Length": croppedBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("Crop error:", error);
        return NextResponse.json(
            { error: "Failed to crop image" },
            { status: 500 }
        );
    }
}
