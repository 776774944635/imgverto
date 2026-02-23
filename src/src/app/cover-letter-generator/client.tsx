"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Copy, Download, RefreshCw, PenTool, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

interface CoverLetterData {
    applicantName: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: string;
    skills: string;
    experienceLevel: 'Fresher' | 'Junior' | 'Senior' | 'Manager';
    tone: 'Professional' | 'Enthusiastic' | 'Confident';
}

const initialData: CoverLetterData = {
    applicantName: "",
    email: "",
    phone: "",
    jobTitle: "",
    companyName: "",
    skills: "",
    experienceLevel: "Junior",
    tone: "Professional"
};

const TEMPLATES = {
    Professional: {
        Fresher: `Dear Hiring Manager,

I am writing to express my strong interest in the {jobTitle} position at {companyName}. As a recent graduate with a passion for {skills}, I am eager to begin my professional career and contribute to your team.

During my academic career, I developed a strong foundation in {skills}. I am a quick learner, highly motivated, and dedicated to delivering high-quality work. I have followed {companyName}'s work in the industry and am impressed by your reputation for excellence.

I am confident that my enthusiasm and willingness to learn make me a strong candidate for this entry-level role. Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to {companyName}.

Sincerely,
{applicantName}
{email} | {phone}`,

        Junior: `Dear Hiring Manager,

I am writing to apply for the {jobTitle} position at {companyName}, as advertised. With my background in {skills} and a strong commitment to professional growth, I believe I would be a valuable asset to your team.

In my previous roles, I have honed my skills in {skills}. I admire {companyName}'s commitment to innovation and would be honored to contribute to your ongoing projects. I am organized, detail-oriented, and ready to take on new challenges.

Thank you for your time and consideration. I am eager to further discuss my qualifications and how I can help {companyName} achieve its goals.

Sincerely,
{applicantName}
{email} | {phone}`,

        Senior: `Dear Hiring Manager,

I am submitting my application for the {jobTitle} role at {companyName} with great enthusiasm. With extensive experience in {skills} and a proven track record of success, I am confident in my ability to drive results for your organization.

Throughout my career, I have led initiatives that leveraged {skills} to improve efficiency and business outcomes. I have long admired {companyName}'s position as a market leader and am excited about the opportunity to bring my strategic vision to your team.

I welcome the opportunity to discuss how my background and leadership skills align with the needs of {companyName}. Thank you for considering my application.

Sincerely,
{applicantName}
{email} | {phone}`,
        Manager: `Dear Hiring Committee,

Please accept this letter as an expression of my interest in the {jobTitle} position at {companyName}. With over [Number] years of experience leading teams and driving strategy in {skills}, I am prepared to deliver immediate value to your organization.

My leadership style focuses on empowering teams to excel in {skills} while aligning operational goals with broader business objectives. I see {companyName} as the perfect environment to apply my expertise in change management and strategic growth.

I would welcome a conversation regarding how my leadership experience can benefit {companyName}. Thank you for your review.

Sincerely,
{applicantName}
{email} | {phone}`
    },
    Enthusiastic: {
        Fresher: `Dear Hiring Team,

I was thrilled to find the opening for a {jobTitle} at {companyName}! As a recent graduate with a burning passion for {skills}, I feel that {companyName} is the perfect place for me to launch my career.

My academic projects have given me hands-on experience with {skills}, but what sets me apart is my drive to learn and grow. I have always been a fan of {companyName}'s work, and the chance to contribute to your team is ample motivation for me to give my 100%.

I would love the opportunity to bring my energy and dedication to your team. Thank you for considering me!

Best regards,
{applicantName}
{email} | {phone}`,
        Junior: `Hi Hiring Team,

I am incredibly excited to apply for the {jobTitle} role at {companyName}. I have been following your company's journey for some time, and the opportunity to use my skills in {skills} to help your team succeed is a dream come true.

I bring a proactive attitude and a solid grasp of {skills}. I thrive in dynamic environments and am always looking for ways to improve and innovate. I believe my energy and technical background would be a great fit for your culture.

I can't wait to hear from you and potentially discuss how I can join the {companyName} family.

Cheers,
{applicantName}
{email} | {phone}`,
        Senior: `To the {companyName} Team,

When I saw the listing for the {jobTitle} position, I knew I had to apply. With a deep passion for {skills} and years of hands-on experience, I am ready to hit the ground running and make a significant impact at {companyName}.

I pride myself on my ability to innovate using {skills} and have successfully delivered projects that moved the needle in my previous roles. I am energized by the prospect of joining a forward-thinking company like yours.

I would be delighted to discuss how my passion and experience can help reach new heights at {companyName}.

Best,
{applicantName}
{email} | {phone}`,
        Manager: `Dear {companyName} Recruitment,

I am writing to express my fervent interest in the {jobTitle} role. As a leader who is passionate about cultivating talent and driving innovation in {skills}, I see this opportunity at {companyName} as the perfect next step.

My management philosophy is simple: build great teams and let them build great things. I have a history of successfully guiding teams through complex challenges using {skills}. I am incredibly excited about the vision of {companyName} and want to be a part of it.

I look forward to the possibility of discussing our future success together.

Warmly,
{applicantName}
{email} | {phone}`
    },
    Confident: {
        Fresher: `Dear Hiring Manager,

I am writing to apply for the {jobTitle} position at {companyName}. Although I am beginning my career, my proficiency in {skills} and my determination to succeed make me a strong contender for this role.

I do not just have a degree; I have a practical mindset and a readiness to tackle real-world problems. I know that {companyName} values performance, and I am prepared to prove my worth from day one.

I am confident that I can be a productive member of your team. Thank you for your time.

Sincerely,
{applicantName}
{email} | {phone}`,
        Junior: `To the Hiring Manager at {companyName},

I am applying for the {jobTitle} position because I am confident that my skills in {skills} are exactly what your team needs. I have a practical approach to problem-solving and a history of delivering quality work.

In my previous role, I quickly became the go-to person for {skills}. I am efficient, reliable, and results-oriented. I believe {companyName} needs someone who can jump in and contribute immediately, and that is exactly what I offer.

I look forward to discussing how my skills will benefit your team.

Regards,
{applicantName}
{email} | {phone}`,
        Senior: `Dear Hiring Manager,

I am the ideal candidate for the {jobTitle} position at {companyName}. exceptional track record in {skills} and strategic planning speaks for itself. I focus on results, efficiency, and growth.

I have spent my career mastering {skills} and optimizing workflows. I know what it takes to succeed in this industry, and I see a clear path to adding value to {companyName} immediately. I am looking for a role where performance is paramount.

I am ready to discuss how I can drive success for your department.

Sincerely,
{applicantName}
{email} | {phone}`,
        Manager: `Dear Search Committee,

I am writing to offer my expertise for the {jobTitle} position at {companyName}. With a proven history of high-level management and mastery of {skills}, I am the leader needed to drive your objectives forward.

I specialize in turning around underperforming units and scaling successful ones. My command of {skills} allows me to make data-driven decisions that yield tangible results. I am confident I can replicate this success at {companyName}.

I expect to deliver immediate impact. I look forward to our meeting.

Sincerely,
{applicantName}
{email} | {phone}`
    }
};

export function CoverLetterClient() {
    const [data, setData] = useState<CoverLetterData>(initialData);
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        generateLetter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = (field: keyof CoverLetterData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const generateLetter = () => {
        let template = TEMPLATES[data.tone][data.experienceLevel];

        // Replace placeholders
        template = template.replace(/{applicantName}/g, data.applicantName || "[Your Name]");
        template = template.replace(/{email}/g, data.email || "[Your Email]");
        template = template.replace(/{phone}/g, data.phone || "[Your Phone]");
        template = template.replace(/{jobTitle}/g, data.jobTitle || "[Job Title]");
        template = template.replace(/{companyName}/g, data.companyName || "[Company Name]");
        template = template.replace(/{skills}/g, data.skills || "[Your Skills]");

        setGeneratedLetter(template);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedLetter], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "cover-letter.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Section className="min-h-screen p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0">
                    <Breadcrumbs items={[{ label: "Cover Letter Generator", href: "/cover-letter-generator" }
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
                                title="Cover Letter Generator"
                                description="Instantly generate a tailored, professional cover letter for your job application."
                            />
                        </div>

                        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Visual - Left Panel (Input) */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-border/50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <PenTool className="w-6 h-6 text-primary" />
                                        <h2 className="text-2xl font-extrabold text-foreground">Your Details</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Your Name</label>
                                                <input
                                                    type="text"
                                                    value={data.applicantName}
                                                    onChange={(e) => handleChange('applicantName', e.target.value)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Target Job Title</label>
                                                <input
                                                    type="text"
                                                    value={data.jobTitle}
                                                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                                                    placeholder="Software Engineer"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground">Target Company</label>
                                            <input
                                                type="text"
                                                value={data.companyName}
                                                onChange={(e) => handleChange('companyName', e.target.value)}
                                                className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="Google, Microsoft, etc."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground">Key Skills (comma separated)</label>
                                            <textarea
                                                value={data.skills}
                                                onChange={(e) => handleChange('skills', e.target.value)}
                                                className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none h-24"
                                                placeholder="Python, React, Project Management, Communication..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Experience Level</label>
                                                <select
                                                    value={data.experienceLevel}
                                                    onChange={(e) => handleChange('experienceLevel', e.target.value as any)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                                                >
                                                    <option value="Fresher">Fresher / Intern</option>
                                                    <option value="Junior">Junior (1-3 years)</option>
                                                    <option value="Senior">Senior (5+ years)</option>
                                                    <option value="Manager">Manager / Lead</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Tone</label>
                                                <select
                                                    value={data.tone}
                                                    onChange={(e) => handleChange('tone', e.target.value as any)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                                                >
                                                    <option value="Professional">Professional (Standard)</option>
                                                    <option value="Enthusiastic">Enthusiastic (Startup friendly)</option>
                                                    <option value="Confident">Confident (Direct)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Email (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={data.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none small"
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground">Phone (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={data.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none small"
                                                    placeholder="+1 234..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual - Right Panel (Output) */}
                            <div className="space-y-6 flex flex-col h-full">
                                <div className="bg-slate-50 rounded-[2rem] p-8 shadow-inner border border-border/50 flex-1 flex flex-col relative group min-h-[500px]">
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 bg-white rounded-lg shadow-sm border hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                                            title="Copy to Clipboard"
                                        >
                                            {isCopied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="p-2 bg-white rounded-lg shadow-sm border hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                                            title="Download Text"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Live Preview</span>
                                    </div>

                                    <textarea
                                        value={generatedLetter}
                                        onChange={(e) => setGeneratedLetter(e.target.value)}
                                        className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 outline-none font-serif text-slate-700 leading-relaxed text-lg"
                                        spellCheck={false}
                                    />

                                    <div className="pt-4 text-center">
                                        <p className="text-xs text-muted-foreground font-medium">
                                            Start typing in the form to see updates automatically. You can also edit this text directly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-4xl mx-auto mt-16 px-4">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this Cover Letter Generator Does",
                                    content: `Our AI-powered tool creates high-quality, professional cover letters tailored to your specific job application. It maps your skills to the requirements of the job, helping you make a great first impression.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: "Ideal for anyone applying for jobs—whether you are a student looking for an internship, a professional switching careers, or a senior executive aiming for a leadership role. It's the perfect way to draft a compelling introduction in seconds."
                                }}
                                howToUse={{
                                    title: "How to Generate Your Winning Cover Letter",
                                    steps: [
                                        "Fill in your name, contact details, and the company you are applying to.",
                                        "List the core skills and achievements you want to highlight.",
                                        "Select your experience level and the desired tone (e.g., Professional or Enthusiastic).",
                                        "Review the generated draft, make any final edits, and download your letter instantly."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Tailored Content: Specifically context-aware drafts for your target role.",
                                        "Tone Control: Match the company culture with Professional or Bold tones.",
                                        "ATS Optimized: Strategic keyword placement to pass automated filters.",
                                        "100% Private: Your details are never stored on our servers. Total privacy.",
                                        "Instant Results: Go from a blank page to a full draft in under 30 seconds.",
                                        "Always Free: No hidden fees or limits on how many letters you can create."
                                    ]
                                }}
                                faqs={[
                                    { question: "Is this cover letter generator truly free?", answer: "Yes, it is 100% free with no daily limits or credit systems." },
                                    { question: "Can I use these letters for LinkedIn?", answer: "Absolutely. The generated text is perfect for LinkedIn 'About' sections or direct recruiter messages." },
                                    { question: "Is my data stored during generation?", answer: "No. The entire process happens in your browser session. Once you close the tab, your data is cleared." },
                                    { question: "Can I edit the generated draft?", answer: "Yes, you can edit the text directly in the preview box before downloading." },
                                    { question: "How many letters can I create?", answer: "You can generate as many tailored letters as you need for different job applications." }
                                ]}
                            />
                            <RelatedTools currentPath="/cover-letter-generator" />
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
