import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import AdmZip from "adm-zip";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Check metadata to get page count
        const metadata = await sharp(buffer).metadata();
        const pageCount = metadata.pages || 1;

        // Create ZIP
        const zip = new AdmZip();

        // Iterate pages
        // Limit to 20 pages max for MVP to prevent timeout on serverless functions?
        // User requested "Production Ready". 
        // Vercel limit is 10s-60s. Large PDFs might timeout.
        // We'll limit concurrency or just loop sequentially.
        const maxPages = 50;
        const pagesToProcess = Math.min(pageCount, maxPages);

        for (let i = 0; i < pagesToProcess; i++) {
            // Render page
            const pageBuffer = await sharp(buffer, { page: i, density: 150 }) // 150 dpi is decent for screen
                .jpeg({ quality: 90 })
                .toBuffer();

            zip.addFile(`page-${i + 1}.jpg`, pageBuffer);
        }

        const zipBuffer = zip.toBuffer();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([zipBuffer as any]), {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="converted-images.zip"`,
            },
        });

    } catch (error) {
        console.error("PDF to JPG error:", error);
        return NextResponse.json(
            { error: "Failed to convert PDF. Ensure file is valid." },
            { status: 500 }
        );
    }
}
