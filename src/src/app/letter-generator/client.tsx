"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Copy, Download, RefreshCw, PenSquare, CheckCircle, Sparkles, Send, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

interface LetterData {
    senderName: string;
    senderDetails: string;
    receiverName: string;
    receiverDetails: string;
    subject: string;
    purpose: string;
    type: 'Formal' | 'Informal' | 'Business' | 'Job' | 'Complaint';
    tone: 'Professional' | 'Casual' | 'Urgent' | 'Polite';
}

const initialData: LetterData = {
    senderName: "",
    senderDetails: "",
    receiverName: "",
    receiverDetails: "",
    subject: "",
    purpose: "",
    type: "Formal",
    tone: "Professional"
};

const TEMPLATES = {
    Formal: `[Your Address/Contact Details]
[Date]

{receiverName}
{receiverDetails}

Subject: {subject}

Dear {receiverName},

I am writing this letter to inform you regarding {purpose}. 

[Relevant details will go here. You can edit this section to include specific facts, dates, or requests.]

I hope for a prompt and favorable response regarding this matter. Thank you for your time and consideration.

Yours sincerely,

{senderName}
{senderDetails}`,

    Informal: `Dear {receiverName},

I hope this letter finds you well. I'm writing to you because {purpose}.

[Personal message/details go here. Feel free to talk about what's been happening lately!]

Anyway, I'd love to hear from you soon. Let's catch up when you have time!

Best wishes,

{senderName}`,

    Business: `[Your Company Name]
[Your Business Address]
[Date]

{receiverName}
{receiverDetails}

Subject: {subject}

Dear {receiverName},

This letter is in reference to {purpose}. On behalf of our organization, we would like to formally address the points discussed.

[Insert specific business terms, contract details, or proposal summaries here.]

We value our professional relationship and look forward to continuing our collaboration. Should you have any questions, please do not hesitate to reach out.

Best Regards,

{senderName}
[Your Position]`,

    Job: `[Your Location]
[Date]

Hiring Manager
{receiverDetails}

Subject: Application for {subject}

Dear Hiring Manager,

I am writing to formally express my interest in the {subject} position at {receiverName}. Having followed your company's growth, I am eager to apply my expertise to contribute to your team's success regarding {purpose}.

[Insert specific achievements or skills that make you the perfect candidate here.]

I have attached my resume for your review and would welcome the opportunity to discuss my qualifications further in an interview.

Thank you for your consideration.

Sincerely,

{senderName}
{senderDetails}`,

    Complaint: `[Your Address]
[Date]

Customer Service Department
{receiverName}

Subject: Formal Complaint regarding {subject}

To Whom It May Concern,

I am writing to lodge a formal complaint regarding {purpose}. I am disappointed with the experience I have had with your service/product.

[Provide specific details of the incident, including dates, account numbers, or product names.]

I expect a resolution to this matter within [Number] business days. I look forward to your prompt response.

Regards,

{senderName}
{senderDetails}`
};

export function LetterGeneratorClient() {
    const [data, setData] = useState<LetterData>(initialData);
    const [generatedContent, setGeneratedContent] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        generateLetter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = (field: keyof LetterData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const generateLetter = () => {
        let template = TEMPLATES[data.type];

        template = template.replace(/{senderName}/g, data.senderName || "[Sender Name]");
        template = template.replace(/{senderDetails}/g, data.senderDetails || "[Sender Details/Email]");
        template = template.replace(/{receiverName}/g, data.receiverName || "[Recipient/Company Name]");
        template = template.replace(/{receiverDetails}/g, data.receiverDetails || "[Recipient Details/Address]");
        template = template.replace(/{subject}/g, data.subject || "[Subject Line]");
        template = template.replace(/{purpose}/g, data.purpose || "[Purpose of the Letter]");

        setGeneratedContent(template);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `letter-${data.type.toLowerCase()}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Section className="min-h-screen p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0">
                    <Breadcrumbs items={[{ label: "Letter Generator", href: "/letter-generator" }
                    ]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8">
                    {/* Left Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center">
                        <div className="w-full text-center mb-1">
                            <div className="flex justify-center mb-1">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                            <ToolHeader
                                title="Professional Letter Generator"
                                description="Create professional formal and informal letters instantly for free."
                            />
                        </div>

                        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Form Section */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-border/50">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                            <PenSquare className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Letter Details</h2>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Letter Type</label>
                                                <select
                                                    value={data.type}
                                                    onChange={(e) => handleChange('type', e.target.value as any)}
                                                    className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold"
                                                >
                                                    <option value="Formal">Formal Letter</option>
                                                    <option value="Informal">Informal Letter</option>
                                                    <option value="Business">Business Letter</option>
                                                    <option value="Job">Job Application</option>
                                                    <option value="Complaint">Complaint Letter</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Tone</label>
                                                <select
                                                    value={data.tone}
                                                    onChange={(e) => handleChange('tone', e.target.value as any)}
                                                    className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold"
                                                >
                                                    <option value="Professional">Professional</option>
                                                    <option value="Casual">Casual</option>
                                                    <option value="Urgent">Urgent</option>
                                                    <option value="Polite">Polite</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Sender Name"
                                                    value={data.senderName}
                                                    onChange={(e) => handleChange('senderName', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Recipient Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Recipient/Company"
                                                    value={data.receiverName}
                                                    onChange={(e) => handleChange('receiverName', e.target.value)}
                                                    className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Subject Line</label>
                                            <input
                                                type="text"
                                                placeholder="Brief summary of the letter"
                                                value={data.subject}
                                                onChange={(e) => handleChange('subject', e.target.value)}
                                                className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground ml-1">Main Purpose</label>
                                            <textarea
                                                placeholder="Explain why you are writing this letter..."
                                                value={data.purpose}
                                                onChange={(e) => handleChange('purpose', e.target.value)}
                                                className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium h-32 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Section */}
                            <div className="relative flex flex-col h-full">
                                <div className="bg-slate-50 flex-1 rounded-[2.5rem] p-8 md:p-10 shadow-inner border border-border/30 flex flex-col relative group overflow-hidden min-h-[500px]">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-500" />

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">Generated Draft</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleCopy}
                                                className="p-3 bg-white rounded-xl shadow-sm border hover:bg-muted transition-all text-muted-foreground hover:text-primary active:scale-95"
                                                title="Copy to Clipboard"
                                            >
                                                {isCopied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={handleDownload}
                                                className="p-3 bg-white rounded-xl shadow-sm border hover:bg-muted transition-all text-muted-foreground hover:text-primary active:scale-95"
                                                title="Download as File"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <textarea
                                        value={generatedContent}
                                        onChange={(e) => setGeneratedContent(e.target.value)}
                                        className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 outline-none font-serif text-slate-700 leading-relaxed text-lg"
                                        spellCheck={false}
                                    />

                                    <div className="mt-6 p-4 rounded-2xl bg-white/50 border border-slate-200/50 text-center">
                                        <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-tighter">
                                            Pro Tip: Click the text above to edit your letter manually.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-4xl mx-auto mt-24 px-4">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this Professional Letter Generator Does",
                                    content: `Our tool helps you draft perfectly formatted letters for any occasion—whether it's a formal business inquiry, a job application, or a personal note. It ensures your communication follows standard etiquette and looks professional.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: "Perfect for students, job seekers, small business owners, and anyone who needs to write a correctly structured letter but isn't sure about the precise formatting rules. It's a quick way to handle official correspondence with confidence."
                                }}
                                howToUse={{
                                    title: "How to Generate Your Professional Letter",
                                    steps: [
                                        "Select the letter type (Formal, Business, Complaint, etc.) and your preferred tone.",
                                        "Enter your contact details and the recipient's information clearly.",
                                        "Provide a brief subject line and the main purpose of your letter.",
                                        "Review the generated draft, edit it manually if needed, and download the finished letter."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Multiple Formats: Pre-built templates for formal, informal, and business use.",
                                        "Professional Etiquette: Automatic handling of layouts, dates, and subject lines.",
                                        "Privacy First: We never store your personal data or generated text. Period.",
                                        "Rapid Drafting: Save time by generating a full draft in seconds.",
                                        "Clean Layouts: Uses industry-standard block formatting for all formal types.",
                                        "100% Free: Access professional communication tools without any cost."
                                    ]
                                }}
                                faqs={[
                                    { question: "Is this letter generator free for everyone?", answer: "Yes, it is 100% free with no sign-up or hidden fees required." },
                                    { question: "Can I use these for school/university applications?", answer: "Absolutely. Choose the 'Formal' or 'Job' type for academic and official requests." },
                                    { question: "Is my data stored on your server?", answer: "No. All text generation happens locally in your browser. We don't see or store your data." },
                                    { question: "Can I download the letter as a PDF?", answer: "Currently, you can download as a .txt file. To get a PDF, simply copy the text into any editor or print to PDF from your browser." },
                                    { question: "How long should a standard formal letter be?", answer: "Usually, one page is best. Our generator helps you stay concise while including all necessary details." }
                                ]}
                            />
                            <RelatedTools currentPath="/letter-generator" />
                        </div>
                    </div>

                    {/* Right Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
