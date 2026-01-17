import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const width = parseInt(formData.get("width") as string);
        const height = parseInt(formData.get("height") as string);
        // const fit = formData.get("fit") as string || "fill"; // Not exposing fit yet, assuming exact resize

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
        if (!width || !height) return NextResponse.json({ error: "Dimensions required" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const originalType = file.type;
        let pipeline = sharp(buffer);
        let contentType = originalType;
        let extension = "jpg"; // default

        if (originalType === "image/png") {
            extension = "png";
            contentType = "image/png";
        } else if (originalType === "image/webp") {
            extension = "webp";
            contentType = "image/webp";
        }

        // Resize
        // force exact dimensions provided by client
        pipeline = pipeline.resize({
            width,
            height,
            fit: 'fill' // Stretch if aspect ratio not maintained by client, or 'contain' ?
            // Standard online resize tools usually 'fill' (distort) if user explicitly typed different W/H
            // But usually client side logic prevents distortion if Lock Ratio is checked.
        });

        const resizedBuffer = await pipeline.toBuffer();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([resizedBuffer as any]), {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="resized-${width}x${height}.${extension}"`,
                "Content-Length": resizedBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error("Resize error:", error);
        return NextResponse.json(
            { error: "Failed to resize image" },
            { status: 500 }
        );
    }
}
