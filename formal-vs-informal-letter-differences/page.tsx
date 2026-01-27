import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Check, Sparkles, Target, Zap, Shield, HelpCircle, Send } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { FAQSection } from '@/components/tools/FAQSection';

export const metadata: Metadata = {
    title: 'Formal vs Informal Letter: Key Differences & Examples | Imgverto',
    description: 'Understand the critical differences between formal and informal letters. Master the formats for home, office, and business. Free letter generator tool inside.',
    alternates: {
        canonical: '/blog/formal-vs-informal-letter-differences',
    },
    openGraph: {
        title: 'Formal vs Informal Letter: Key Differences & Examples | Imgverto',
        description: 'A deep dive into letter writing etiquette and formatting for all occasions.',
        url: `${siteConfig.url}/blog/formal-vs-informal-letter-differences`,
        type: 'article',
    },
};

export default function LetterBlog() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-4xl mx-auto px-4">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-black uppercase tracking-widest mb-8 border border-amber-200">
                        <Send className="w-4 h-4" /> Writing Etiquette
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                        Formal vs Informal Letter: Differences & Examples
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
                        In an era of instant messaging, the art of letter writing remains a vital skill for personal and professional success.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto prose-headings:font-black prose-headings:tracking-tight prose-a:text-amber-600 prose-strong:text-slate-900">
                    <p>
                        Communication is the bedrock of society, but the <em>way</em> we communicate depends entirely on the context. Writing a letter to your best friend requires a completely different vocabulary, structure, and tone than writing a letter to a government official or a prospective employer.
                    </p>

                    <p>
                        Misjudging the tone of a letter can lead to awkward social situations or, worse, professional setbacks. This guide serves as a definitive resource on the <strong>differences between formal and informal letters</strong>. Plus, we'll show you how our <Link href="/letter-generator">Free Letter Generator</Link> can help you get the format right every time.
                    </p>

                    <h2>1. What is a Formal Letter?</h2>
                    <p>
                        A formal letter is any written communication meant for official or professional purposes. It follows a strict hierarchical layout (often called block formatting) and maintains a respectful, objective tone.
                    </p>
                    <h3>When to use a Formal Letter:</h3>
                    <ul>
                        <li>Job applications (see our <Link href="/blog/how-to-write-a-cover-letter-for-any-job">Cover Letter Guide</Link>).</li>
                        <li>Resignation letters.</li>
                        <li>Business inquiries or proposals.</li>
                        <li>Official complaints regarding services or products.</li>
                        <li>Contacting government or university officials.</li>
                    </ul>

                    <h2>2. What is an Informal Letter?</h2>
                    <p>
                        Informal letters are written to people you know personally, such as family members, friends, or close acquaintances. They are loose in structure, often emotional, and written in a conversational tone similar to how you would speak to the person face-to-face.
                    </p>
                    <h3>When to use an Informal Letter:</h3>
                    <ul>
                        <li>Invitation to a birthday party or dinner.</li>
                        <li>Thank you note to a friend.</li>
                        <li>Sharing personal news or life updates.</li>
                        <li>Condolences or letters of support.</li>
                    </ul>

                    <div className="my-12 p-8 bg-amber-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <h3 className="text-white mt-0 mb-6 flex items-center gap-3">
                            <Zap className="w-6 h-6 text-yellow-400" /> Key Difference: The Header
                        </h3>
                        <p className="text-slate-300 mb-0">
                            Formal letters <strong>must</strong> include the sender's address, the date, and the recipient's address. Informal letters usually only include the date or nothing at all if sent via digital means.
                        </p>
                    </div>

                    <h2>3. Deep Dive into the Differences</h2>

                    <h3>Tone and Language</h3>
                    <p>
                        Formal letters use passive voice ("The decision was made") and avoid contractions (use "do not" instead of "don't"). They are precise and get straight to the point.
                    </p>
                    <p>
                        Informal letters use active voice, slang, idioms, and contractions. They can be wordy, repetitive, and full of exclamation marks.
                    </p>

                    <h3>Structure and Layout</h3>
                    <p>
                        The formal letter follows the <strong>Sender-Date-Recipient-Subject-Salutation-Body-Closing</strong> sequence. It looks organized and professional at a glance.
                    </p>
                    <p>
                        The informal letter often starts straight with a "Hi [Name]," and flows organically without rigid sectioning.
                    </p>

                    <h2>4. How to format your letter in 2026</h2>
                    <p>
                        Even in 2026, certain standards apply. For formal letters, <strong>Block Style</strong> is the standard—everything is left-aligned. Use a professional font like Inter or Arial.
                    </p>
                    <p>
                        If you find formatting tedious, you can use a <Link href="/letter-generator">Letter Builder</Link> to ensure your layout is pixel-perfect for printing or emailing.
                    </p>

                    <h2>5. Why Etiquette Matters</h2>
                    <p>
                        Using a formal tone when an informal one is expected can make you seem cold or distant. Conversely, being too casual in a professional setting can make you seem unprofessional or disrespectful.
                    </p>
                    <p>
                        If you are applying for a job, your letter is the first test of your communication skills. If you fail to follow the correct format, a recruiter might assume your technical work will be equally disorganized. Use our <Link href="/resume-builder">Resume Tool</Link> to match your high-quality letter with a high-quality CV.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Understanding the difference between formal and informal letters is about more than just grammar—it's about emotional intelligence. By matching your tone and format to the situation, you ensure your message is heard, understood, and respected.
                    </p>
                </div>

                <div className="my-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-[3rem] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <Send className="w-16 h-16 mx-auto mb-8 text-amber-200" />
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Write Better Letters Today</h2>
                        <p className="text-xl md:text-2xl text-amber-100 mb-10 max-w-2xl mx-auto font-medium">
                            Whether it's for an office complaint or a friend's invitation, get the tone right in seconds.
                        </p>
                        <Link
                            href="/letter-generator"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-amber-700 font-black text-xl rounded-full hover:bg-amber-50 transition-all shadow-xl active:scale-95"
                        >
                            Generate My Letter Free <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>

                <FAQSection items={[
                    { question: "Can a letter be semi-formal?", answer: "Yes. Semi-formal letters are used for colleagues you know well or acquaintances. They use professional structure but with a slightly warmer tone." },
                    { question: "What is the best closing for a business letter?", answer: "Best Regards' or 'Sincerely' are the most accepted professional closings." },
                    { question: "Should I sign a digital letter manually?", answer: "In 2026, digital signatures or even just your typed name are standard for email letters. For physical mail, a hand-written signature is still best." },
                    { question: "How do I start a letter if I don't know the name?", answer: "If a name is impossible to find, 'Dear Hiring Team' or 'To the Customer Support Department' is better than 'To Whom It May Concern'." },
                    { question: "Can I use an informal tone for a job interview thank you?", answer: "No. Keep it professional and polite, though you can show more personality than in the initial application." }
                ]} />

                <div className="mt-20 pt-16 border-t border-slate-100 text-center">
                    <h3 className="text-2xl font-black text-slate-900 mb-8">Career & Writing Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog/how-to-create-a-professional-resume-online" className="p-6 rounded-2xl bg-white border hover:border-amber-500 transition-colors group">
                            <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">How to build a resume &rarr;</h4>
                        </Link>
                        <Link href="/blog/how-to-write-a-cover-letter-for-any-job" className="p-6 rounded-2xl bg-white border hover:border-amber-500 transition-colors group">
                            <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">How to write a cover letter &rarr;</h4>
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
