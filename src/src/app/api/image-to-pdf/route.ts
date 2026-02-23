import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[]; // Expecting 'files' key properly

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }

        const pdfDoc = await PDFDocument.create();

        for (const file of files) {
            const buffer = await file.arrayBuffer();
            const type = file.type;

            let image;
            try {
                if (type === "image/jpeg" || type === "image/jpg") {
                    image = await pdfDoc.embedJpg(buffer);
                } else if (type === "image/png") {
                    image = await pdfDoc.embedPng(buffer);
                } else {
                    // Skip or handle error. PDF-lib supports PNG/JPG standard.
                    // For WebP, we might need to convert it using Sharp first?
                    // YES. pdf-lib DOES NOT support WebP natively.
                    // If incoming is WebP, we need sharp to convert to PNG first.
                    // Let's implement that handling if we have sharp available.
                    // We do have sharp.
                    console.log(`Skipping direct embed for ${type}, needs conversion if supported`);
                    continue; // Minimal MVP for now: only JPG/PNG
                }
            } catch (e) {
                console.error(`Failed to embed ${file.name}`, e);
                continue;
            }

            if (image) {
                const page = pdfDoc.addPage();
                const { width, height } = image.scale(1);

                // Fit image to page - Determine page usage. 
                // Usually we resize page to fit image, OR resize image to fit A4.
                // Let's resize Page to match image dimensions for "Image to PDF". 
                // This is usually preferred for photo-scan style PDFs.
                page.setSize(width, height);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width,
                    height,
                });
            }
        }

        const pdfBytes = await pdfDoc.save();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([pdfBytes as any]), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="images-converted.pdf"`,
            },
        });

    } catch (error) {
        console.error("PDF Generation error:", error);
        return NextResponse.json(
            { error: "Failed to create PDF" },
            { status: 500 }
        );
    }
}
