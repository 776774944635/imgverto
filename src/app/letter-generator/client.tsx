"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Copy, Download, RefreshCw, PenSquare, CheckCircle, Sparkles, Send, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        <Section className="min-h-screen flex flex-col items-center">
            <ToolHeader
                title="AI Letter Generator"
                description="Create professional formal and informal letters instantly with our free online tool."
            />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-border/50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                <PenSquare className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-foreground tracking-tight">Letter Details</h2>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Letter Type</label>
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
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Tone</label>
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
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Sender Name"
                                        value={data.senderName}
                                        onChange={(e) => handleChange('senderName', e.target.value)}
                                        className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Recipient Name</label>
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
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Line</label>
                                <input
                                    type="text"
                                    placeholder="Brief summary of the letter"
                                    value={data.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                    className="w-full p-4 rounded-2xl border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Main Purpose</label>
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
                    <div className="bg-slate-50 flex-1 rounded-[2.5rem] p-8 md:p-10 shadow-inner border border-border/30 flex flex-col relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-violet-500" />

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Generated Draft</span>
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
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                                Pro Tip: Click the text above to edit your letter manually.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <div className="w-full max-w-4xl prose prose-slate prose-lg dark:prose-invert my-24 border-t pt-24">
                <h2 className="text-4xl font-black text-center mb-16 tracking-tight">The Professional Guide to Effective Letter Writing</h2>

                <p>
                    Writing a letter is more than just putting words on paper; it's about conveying your intention with the appropriate etiquette. Whether you're applying for a high-stakes job, addressing a business partner, or simply catching up with an old friend, the format and tone of your letter dictate how yours message is received. Imgverto's <strong>Free Letter Generator</strong> is designed to help you navigate these nuances with ease.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 not-prose">
                    <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 relative group overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
                        <h4 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500" /> Formal Letters
                        </h4>
                        <p className="text-amber-800 text-base leading-relaxed">
                            Formal letters are used for professional or official communications. They follow a strict layout, including addresses, dates, and a clear subject line. These are essential for job applications, formal complaints, or official business inquiries.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 relative group overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
                        <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" /> Informal Letters
                        </h4>
                        <p className="text-blue-800 text-base leading-relaxed">
                            Informal letters are written to friends, relatives, or acquaintances. The structure is flexible, and the tone is conversational. They allow for personal news, jokes, and a warm closing like "Warm regards" or "Best wishes."
                        </p>
                    </div>
                </div>

                <h3>Common Letter Formats & Examples</h3>
                <p>
                    Consistency is key in professional communication. Here are the common formats supported by our generator:
                </p>
                <ul>
                    <li><strong>Business Letter Format:</strong> Usually follows the "Block Formatting" style where everything is left-aligned. It's clean, modern, and widely accepted in corporate environments.</li>
                    <li><strong>Job Application (Cover Letter):</strong> Focused on mapping your skills to the employer's needs. It should be concise and action-oriented.</li>
                    <li><strong>Complaint Letter:</strong> Should be firm but polite. clearly state the issue and the resolution you expect to see.</li>
                </ul>

                <h3>Why Use Imgverto's Letter Generator?</h3>
                <p>
                    Our tool isn't just a static template; it's a dynamic builder that adapts to your input. Here's why users prefer Imgverto:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 not-prose">
                    {[
                        { title: "No Account Needed", desc: "Just typed and download. We don't track your personal data." },
                        { title: "Multiple Tones", desc: "Switch between professional, casual, or urgent with one click." },
                        { title: "Instant Download", desc: "Get your draft as a clean text file ready for printing." }
                    ].map((item, idx) => (
                        <div key={idx} className="p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <h5 className="font-black text-foreground mb-2">{item.title}</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <h3>Mistakes to Avoid in Official Communications</h3>
                <p>
                    Even with a generator, keep these tips in mind to ensure your letter hits the mark:
                </p>
                <ol>
                    <li><strong>Ignoring the Recipient's Name:</strong> "Dear [Specific Name]" is 10x more effective than "Dear Sir/Madam."</li>
                    <li><strong>Excessive Wordiness:</strong> Get to the point quickly. Respect the reader's time.</li>
                    <li><strong>Neglecting Proofreading:</strong> A single typo can undermine your entire professional image.</li>
                    <li><strong>Vague Purpose:</strong> Ensure the recipient knows exactly why you are writing by the end of the first paragraph.</li>
                </ol>

                <div className="p-10 bg-primary/5 rounded-[2.5rem] my-16 border border-primary/10">
                    <h4 className="text-primary font-black text-2xl mb-6">Boost Your Career Toolkit</h4>
                    <p className="mb-8">
                        Beyond just letters, Imgverto offers specialized tools to help you succeed in your professional journey:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/resume-builder" className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary transition-all flex items-center justify-between no-underline">
                            <div className="space-y-1">
                                <span className="block font-black text-foreground group-hover:text-primary transition-colors">Resume Builder</span>
                                <span className="block text-xs text-muted-foreground">Create ATS-friendly resumes</span>
                            </div>
                            <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <Link href="/cover-letter-generator" className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary transition-all flex items-center justify-between no-underline">
                            <div className="space-y-1">
                                <span className="block font-black text-foreground group-hover:text-primary transition-colors">Cover Letter Creator</span>
                                <span className="block text-xs text-muted-foreground">Persuade hiring managers</span>
                            </div>
                            <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>

                <h3>Frequently Asked Questions</h3>
                <FAQSection items={[
                    { question: "Can I generate a letter for school/university?", answer: "Yes, use the 'Formal' or 'Job' type for applications, leave requests, or letters to university officials." },
                    { question: "Is my data stored on the server?", answer: "No. Everything happens in your browser. Once you close the tab, your data is gone." },
                    { question: "What is 'Block Formatting'?", answer: "It is a standard layout where everything starts at the left margin, making it easy to read and clean for business use." },
                    { question: "Can I download as PDF?", answer: "Currently, you can download as a .txt file. To get a PDF, simply copy the text into any editor or use the 'Print' function in your browser." },
                    { question: "How long should a formal letter be?", answer: "Ideally, it should stay on one page. 3-4 concise paragraphs are more effective than several pages of text." }
                ]} />
            </div>

            <RelatedTools currentPath="/letter-generator" />
        </Section>
    );
}
