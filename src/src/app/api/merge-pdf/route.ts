import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length < 2) {
            return NextResponse.json({ error: "At least 2 files required" }, { status: 400 });
        }

        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const buffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([mergedPdfBytes as any]), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="merged.pdf"`,
            },
        });

    } catch (error) {
        console.error("Merge error:", error);
        return NextResponse.json(
            { error: "Failed to merge PDFs" },
            { status: 500 }
        );
    }
}
