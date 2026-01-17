import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();

        // Load the PDF.
        const pdfDoc = await PDFDocument.load(buffer);

        // Compress logic:
        // 1. Remove unused objects (standard save does this).
        // 2. Use Object Streams (standard save usually does, ensuring it).
        // Note: Deep compression (resampling images) is not supported by pdf-lib purely.
        // We rely on structure optimization here.

        // Check if we can do anything else? 
        // We could iterate pages and remove annotations if requested, but default is "compress" which implies size.
        // Basic structural compression:
        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

        // Note: If the result is larger, we return the original (rare but possible with highly optimized inputs).
        // However, users expect a download. We return the processed one.

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([pdfBytes as any]), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
            },
        });

    } catch (error) {
        console.error("Compression error:", error);
        return NextResponse.json(
            { error: "Failed to compress PDF" },
            { status: 500 }
        );
    }
}
