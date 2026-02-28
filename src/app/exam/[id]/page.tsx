import { ExamPrepClient } from "./client";
import { examDatabase } from "@/data/exams";
import { Metadata } from "next";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const exam = examDatabase.find(e => e.id === params.id);

    if (!exam) {
        return {
            title: "Exam Not Found | Imgverto",
        };
    }

    return {
        title: `Prepare Photo & Signature for ${exam.title} Online | Free Tool`,
        description: `Automatically resize, crop, and compress your photo to exactly meet the ${exam.title} requirements of ${exam.requirements[0]?.widthPx || exam.requirements[0]?.widthCm} width and ${exam.requirements[0]?.maxSizeKb}KB size. Free online tool by Imgverto.`,
    };
}

export function generateStaticParams() {
    return examDatabase.map((exam) => ({
        id: exam.id,
    }));
}

export default function ExamPage({ params }: Props) {
    const exam = examDatabase.find(e => e.id === params.id);

    if (!exam) {
        return <div className="p-20 text-center font-bold text-2xl">Exam requirements not found.</div>;
    }

    return <ExamPrepClient exam={exam} />;
}
