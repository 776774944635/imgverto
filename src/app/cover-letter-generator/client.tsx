"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Copy, Download, RefreshCw, PenTool, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        <Section className="min-h-screen flex flex-col items-center">
            <ToolHeader
                title="Cover Letter Generator"
                description="Instantly generate a tailored, professional cover letter for your job application."
            />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual - Left Panel (Input) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-border/50">
                        <div className="flex items-center gap-3 mb-6">
                            <PenTool className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-black text-foreground">Your Details</h2>
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
                    <div className="bg-slate-50 rounded-[2rem] p-8 shadow-inner border border-border/50 flex-1 flex flex-col relative group">
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

            {/* SEO Content */}
            <div className="w-full max-w-4xl prose prose-slate prose-lg dark:prose-invert my-16 border-t pt-16">
                <h2 className="text-4xl font-black text-center mb-12">The Ultimate Guide to Writing a Winning Cover Letter</h2>

                <p>
                    A cover letter is more than just a formality; it's your personal introduction to a potential employer. While your resume provides a factual summary of your history, your cover letter allows you to inject personality, explain context, and demonstrate enthusiasm. Using Imgverto's <strong>Free Cover Letter Generator</strong>, you can create a high-quality draft in seconds, but understanding the principles of a great letter will help you customize it for maximum impact.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                    <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                        <h4 className="text-xl font-bold text-indigo-900 mb-4">Why it Matters</h4>
                        <p className="text-indigo-800 text-base">70% of hiring managers say they prefer candidates who include a cover letter, even when it's optional. it shows effort and intent.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100">
                        <h4 className="text-xl font-bold text-emerald-900 mb-4">The Goal</h4>
                        <p className="text-emerald-800 text-base">The primary goal isn't to get the job—it's to get the reader to look at your resume with interest and move you to the interview pile.</p>
                    </div>
                </div>

                <h3>How to Write a Perfect Cover Letter</h3>
                <p>
                    A perfect cover letter follows a specific structure that balances professionalism with a personal touch. Here is the breakdown:
                </p>
                <ul>
                    <li><strong>The Header:</strong> Include your contact information and the date. If possible, include the recipient's name and company address.</li>
                    <li><strong>The Greeting:</strong> Always try to find a specific name. Use "Dear [Name]," instead of "To Whom It May Concern."</li>
                    <li><strong>The Hook:</strong> Your opening sentence should be strong. Mention the specific role and why you are excited about it.</li>
                    <li><strong>The Body:</strong> focus on two or three key achievements. Don't just list what you did; explain the <em>impact</em> you had. Use data and numbers whenever possible.</li>
                    <li><strong>The Closing:</strong> Reiterate your interest, thank the reader for their time, and include a call to action, such as "I look forward to discussing how I can contribute to your team."</li>
                </ul>

                <h3>Common Mistakes to Avoid</h3>
                <p>
                    Even with a generator, you should be mindful of these common pitfalls:
                </p>
                <ol>
                    <li><strong>Typos and Grammatical Errors:</strong> Nothing kills credibility faster than a spelling mistake in your first paragraph.</li>
                    <li><strong>Being Too Generic:</strong> If you don't mention the company name or specific role requirements, it looks like a mass-produced letter.</li>
                    <li><strong>Talking Only About Yourself:</strong> The letter should focus on how you can solve the <em>employer's</em> problems, not just what the job will do for you.</li>
                    <li><strong>Rehashing Your Resume:</strong> If you're just listing your jobs again, you're wasting the reader's time. Use this space to add color to your experiences.</li>
                </ol>

                <div className="my-16 p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl">
                    <h3 className="text-white mt-0">Cover Letter Formats: Choosing the Right Style</h3>
                    <p className="text-slate-300">
                        Depending on your industry, you might choose different formats:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div>
                            <h4 className="text-primary font-bold mb-2">Standard</h4>
                            <p className="text-sm text-slate-400">Best for corporate, legal, or finance roles. Focuses on formality and hierarchy.</p>
                        </div>
                        <div>
                            <h4 className="text-primary font-bold mb-2">Modern</h4>
                            <p className="text-sm text-slate-400">Great for tech, marketing, and startups. Clean, direct, and slightly more conversational.</p>
                        </div>
                        <div>
                            <h4 className="text-primary font-bold mb-2">Creative</h4>
                            <p className="text-sm text-slate-400">Used for design or creative writing roles. Allows for more storytelling and visual flair.</p>
                        </div>
                    </div>
                </div>

                <h3>Tips for Freshers vs. Experienced Professionals</h3>
                <p>
                    Your approach should change depending on where you are in your career path:
                </p>
                <h4>For Freshers and Interns</h4>
                <p>
                    Without a long work history, focus on your education, relevant coursework, and soft skills. Mention any internships, volunteer work, or university projects where you demonstrated leadership or technical proficiency in <strong>{data.skills || "your field"}</strong>. Demonstrate that you are a fast learner who is eager to contribute.
                </p>
                <h4>For Experienced Professionals</h4>
                <p>
                    Focus heavily on your track record. Mention specific instances where you saved money, made money, or improved processes for your previous employers. Use your cover letter to explain <em>why</em> you're looking for a change and how your background in <strong>{data.skills || "your expertise"}</strong> makes you the perfect fit for the <strong>{data.jobTitle || "new role"}</strong>.
                </p>

                <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2rem] my-12">
                    <h4 className="text-primary mt-0">Explore More Professional Tools</h4>
                    <p className="text-foreground/80">
                        Maximize your job search success by using our full suite of career tools:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                        <li className="m-0">
                            <Link href="/resume-builder" className="flex items-center gap-2 p-3 bg-white rounded-xl border hover:border-primary transition-colors no-underline">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <span className="font-bold text-sm">Professional Resume Builder</span>
                            </Link>
                        </li>
                        <li className="m-0">
                            <Link href="/formal-letter-generator" className="flex items-center gap-2 p-3 bg-white rounded-xl border hover:border-primary transition-colors no-underline">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <span className="font-bold text-sm">Formal Letter Generator</span>
                            </Link>
                        </li>
                        <li className="m-0">
                            <Link href="/blog" className="flex items-center gap-2 p-3 bg-white rounded-xl border hover:border-primary transition-colors no-underline">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <span className="font-bold text-sm">Career & Tech Blog</span>
                            </Link>
                        </li>
                        <li className="m-0">
                            <Link href="/" className="flex items-center gap-2 p-3 bg-white rounded-xl border hover:border-primary transition-colors no-underline">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <span className="font-bold text-sm">Back to Tools Homepage</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <h3>Why Imgverto's Generator is Better</h3>
                <p>
                    Unlike other tools that force you to create an account or pay a fee just to download your text, Imgverto is 100% free and private. We don't store your data, and we provide multiple templates—Professional, Enthusiastic, and Confident—so you can match the exact vibe of the company you're applying to.
                </p>
                <p>
                    Our templates are built based on real-world hiring data, ensuring that the structure and language used are what recruiters actually want to see in 2026. Whether you need a cover letter for a remote software job at <strong>{data.companyName || "a top tech firm"}</strong> or a local retail position, we have you covered.
                </p>
            </div>

            <FAQSection items={[
                { question: "Is this cover letter generator truly free?", answer: "Yes, 100%. We believe professional tools should be accessible to everyone. There are no hidden fees or 'pro' versions." },
                { question: "Can I use the generated text for LinkedIn?", answer: "Absolutely! You can use the generated text as a base for your LinkedIn 'About' section or for direct messages to recruiters." },
                { question: "How many cover letters can I generate?", answer: "As many as you want. There are no daily limits. We encourage you to generate a new tailored letter for every single job you apply for." },
                { question: "What should I do if the template is too long?", answer: "You can edit the text directly in our preview box. We recommend keeping most cover letters under 400 words." },
                { question: "Is the generator ATS friendly?", answer: "ATS systems primarily scan resumes, but many also scan cover letters for keywords. Our generator ensures that your key skills are mentioned naturally throughout the text." }
            ]} />

            <RelatedTools currentPath="/cover-letter-generator" />
        </Section>
    );
}
