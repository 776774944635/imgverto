"use client";

import { useState, useRef } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import {
    Download, Plus, Trash2, ChevronLeft, ChevronRight,
    User, Briefcase, GraduationCap, Award, Monitor,
    FileText, Palette, Layout, Type
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Types ---

interface Education {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

interface ResumeTheme {
    color: string;
    font: 'sans' | 'serif' | 'mono';
    template: 'classic' | 'modern';
}

interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
    skills: string;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    certifications: Certification[];
    sectionOrder: string[];
    theme: ResumeTheme;
}

const initialData: ResumeData = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    skills: "",
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    sectionOrder: ['experience', 'education', 'projects', 'skills', 'certifications'],
    theme: {
        color: 'slate',
        font: 'sans',
        template: 'classic'
    }
};

// --- Configuration ---

const STEPS = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Education", icon: GraduationCap },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Skills", icon: Monitor },
    { id: 5, title: "Projects", icon: FileText },
    { id: 6, title: "Certifications", icon: Award },
    { id: 7, title: "Design", icon: Palette },
    { id: 8, title: "Finish", icon: Download },
];

const COLORS = [
    { id: 'slate', name: 'Slate', value: '#334155', class: 'text-slate-900 border-slate-900 bg-slate-900' },
    { id: 'blue', name: 'Blue', value: '#2563eb', class: 'text-blue-600 border-blue-600 bg-blue-600' },
    { id: 'emerald', name: 'Emerald', value: '#059669', class: 'text-emerald-600 border-emerald-600 bg-emerald-600' },
    { id: 'rose', name: 'Rose', value: '#e11d48', class: 'text-rose-600 border-rose-600 bg-rose-600' },
    { id: 'amber', name: 'Amber', value: '#d97706', class: 'text-amber-600 border-amber-600 bg-amber-600' },
    { id: 'violet', name: 'Violet', value: '#7c3aed', class: 'text-violet-600 border-violet-600 bg-violet-600' },
];

const FONTS = [
    { id: 'sans', name: 'Modern (Sans)', class: 'font-sans' },
    { id: 'serif', name: 'Classic (Serif)', class: 'font-serif' },
    { id: 'mono', name: 'Technical (Mono)', class: 'font-mono' },
];

const TEMPLATES = [
    { id: 'classic', name: 'Classic Clean', icon: Layout },
    { id: 'modern', name: 'Modern Split', icon: Layout },
];

// --- Components ---

function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border shadow-sm mb-3 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors group">
            <span className="font-semibold capitalize text-foreground/80 flex items-center gap-3">
                <div className="p-2 bg-muted group-hover:bg-primary/10 transition-colors rounded-lg">
                    <props.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                {props.id}
            </span>
            <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">Drag to reorder</div>
        </div>
    );
}

const InputGroup = ({ label, value, onChange, placeholder, type = "text", textarea = false, icon: Icon }: any) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground/70 ml-1">{label}</label>
        <div className="relative group">
            {Icon && (
                <div className="absolute left-3 top-3.5 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
            )}
            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full p-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px] transition-all",
                        Icon && "pl-10"
                    )}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full p-3 rounded-xl border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                        Icon && "pl-10"
                    )}
                />
            )}
        </div>
    </div>
);

// --- Resume Preview Component ---

const ResumePreview = ({ data, targetRef }: { data: ResumeData, targetRef: any }) => {
    const themeColor = COLORS.find(c => c.id === data.theme.color) || COLORS[0];
    const themeFont = FONTS.find(f => f.id === data.theme.font) || FONTS[0];

    return (
        <div
            ref={targetRef}
            id="resume-preview"
            className={cn(
                "bg-white mx-auto shadow-2xl print:shadow-none min-h-[297mm] w-[210mm] origin-top-left transition-all duration-300",
                "text-slate-800 text-sm leading-relaxed",
                themeFont.class,
                // Scale for preview container
                "transform scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.65] xl:scale-[0.8] 2xl:scale-[1] print:scale-100 print:transform-none"
            )}
            style={{
                marginBottom: '-30%' // Negative margin to account for scaling whitespace
            }}
        >
            <div className={cn(
                "h-full min-h-[297mm]",
                data.theme.template === 'modern' ? "flex" : "p-[20mm]"
            )}>
                {/* Modern Sidebar */}
                {data.theme.template === 'modern' && (
                    <div className={cn("w-1/3 p-8 text-white space-y-8 flex-shrink-0", themeColor.bg)}>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold leading-tight">{data.fullName || "Your Name"}</h1>
                            <p className="text-white/80 font-medium text-lg">{data.summary || "Professional Title"}</p>
                        </div>

                        <div className="space-y-4 text-sm text-white/90">
                            {data.email && <div className="flex items-center gap-2 break-all opacity-80"><span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />{data.email}</div>}
                            {data.phone && <div className="flex items-center gap-2 opacity-80"><span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />{data.phone}</div>}
                            {data.location && <div className="flex items-center gap-2 opacity-80"><span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />{data.location}</div>}
                            {data.linkedin && <div className="flex items-center gap-2 opacity-80"><span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />LinkedIn</div>}
                            {data.portfolio && <div className="flex items-center gap-2 opacity-80"><span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />Portfolio</div>}
                        </div>

                        {data.skills && (
                            <div className="pt-4 border-t border-white/20">
                                <h3 className="font-bold uppercase tracking-widest text-xs mb-4 opacity-70">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/20 rounded text-xs">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data.certifications.length > 0 && (
                            <div className="pt-4 border-t border-white/20">
                                <h3 className="font-bold uppercase tracking-widest text-xs mb-4 opacity-70">Certifications</h3>
                                <div className="space-y-3">
                                    {data.certifications.map(cert => (
                                        <div key={cert.id} className="text-sm">
                                            <div className="font-bold">{cert.name}</div>
                                            <div className="opacity-75 text-xs">{cert.issuer}, {cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Main Content Area */}
                <div className={cn(
                    "flex-1 space-y-6",
                    data.theme.template === 'modern' ? "p-8 py-10" : ""
                )}>
                    {/* Classic Header (Only for Classic Template) */}
                    {data.theme.template === 'classic' && (
                        <div className={cn("border-b-2 pb-6 mb-6", themeColor.border)}>
                            <h1 className={cn("text-4xl font-bold uppercase tracking-wider mb-2", themeColor.text)}>
                                {data.fullName || "Your Name"}
                            </h1>
                            <div className="text-lg font-medium text-slate-600 mb-4">{data.summary || "Professional Title"}</div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-xs">
                                {data.email && <span>{data.email}</span>}
                                {data.phone && <span>• {data.phone}</span>}
                                {data.location && <span>• {data.location}</span>}
                                {data.linkedin && <span>• LinkedIn</span>}
                            </div>
                        </div>
                    )}

                    {/* Dynamic Sections */}
                    {data.sectionOrder.map((section) => {
                        if (section === 'skills' && data.theme.template === 'modern') return null; // Skills are in sidebar for modern
                        if (section === 'certifications' && data.theme.template === 'modern') return null; // Certs are in sidebar for modern

                        const SectionTitle = ({ title }: { title: string }) => (
                            <h2 className={cn(
                                "text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4",
                                themeColor.border,
                                themeColor.text
                            )}>
                                {title}
                            </h2>
                        );

                        switch (section) {
                            case 'experience':
                                return data.experience.length > 0 && (
                                    <section key="experience">
                                        <SectionTitle title="Experience" />
                                        <div className="space-y-5">
                                            {data.experience.map((exp) => (
                                                <div key={exp.id}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="font-bold text-base text-slate-900">{exp.position}</h3>
                                                        <span className="text-slate-500 italic whitespace-nowrap text-xs">{exp.startDate} – {exp.endDate}</span>
                                                    </div>
                                                    <div className={cn("font-medium mb-2", themeColor.text)}>{exp.company}</div>
                                                    <p className="whitespace-pre-line text-slate-600 text-justify">{exp.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            case 'education':
                                return data.education.length > 0 && (
                                    <section key="education">
                                        <SectionTitle title="Education" />
                                        <div className="space-y-4">
                                            {data.education.map((edu) => (
                                                <div key={edu.id}>
                                                    <div className="flex justify-between items-baseline">
                                                        <h3 className="font-bold text-slate-900">{edu.school}</h3>
                                                        <span className="text-slate-500 italic text-xs">{edu.startDate} – {edu.endDate}</span>
                                                    </div>
                                                    <div className={cn("", themeColor.text)}>{edu.degree}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            case 'projects':
                                return data.projects.length > 0 && (
                                    <section key="projects">
                                        <SectionTitle title="Projects" />
                                        <div className="space-y-4">
                                            {data.projects.map((proj) => (
                                                <div key={proj.id}>
                                                    <div className="flex justify-between items-baseline">
                                                        <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className={cn("text-xs underline", themeColor.text)}>Link</a>}
                                                    </div>
                                                    <p className="text-slate-600 mt-1">{proj.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            case 'skills':
                                return data.skills && (
                                    <section key="skills">
                                        <SectionTitle title="Skills" />
                                        <p className="text-slate-700 leading-relaxed">{data.skills}</p>
                                    </section>
                                );
                            case 'certifications':
                                return data.certifications.length > 0 && (
                                    <section key="certifications">
                                        <SectionTitle title="Certifications" />
                                        <div className="space-y-2">
                                            {data.certifications.map((cert) => (
                                                <div key={cert.id} className="flex justify-between items-baseline">
                                                    <div className="font-bold text-slate-700">{cert.name} <span className="font-normal text-slate-500">- {cert.issuer}</span></div>
                                                    <span className="text-slate-500 italic text-xs">{cert.date}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

// --- Main Client Component ---

export function ResumeBuilderClient() {
    const [activeStep, setActiveStep] = useState(1);
    const [data, setData] = useState<ResumeData>(initialData);
    const resumeRef = useRef<HTMLDivElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setData((prev) => {
                const oldIndex = prev.sectionOrder.indexOf(active.id as string);
                const newIndex = prev.sectionOrder.indexOf(over?.id as string);
                return { ...prev, sectionOrder: arrayMove(prev.sectionOrder, oldIndex, newIndex) };
            });
        }
    };

    const handleInputChange = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (section: any, id: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            [section]: prev[section as keyof ResumeData].map((item: any) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = (section: 'education' | 'experience' | 'projects' | 'certifications') => {
        const id = Math.random().toString(36).substr(2, 9);
        const newItems: any = {
            education: { id, school: "", degree: "", startDate: "", endDate: "", description: "" },
            experience: { id, company: "", position: "", startDate: "", endDate: "", description: "" },
            projects: { id, name: "", description: "", link: "" },
            certifications: { id, name: "", issuer: "", date: "" }
        };
        setData(prev => ({ ...prev, [section]: [...prev[section], newItems[section]] }));
    };

    const removeItem = (section: any, id: string) => {
        setData(prev => ({ ...prev, [section]: prev[section as keyof ResumeData].filter((item: any) => item.id !== id) }));
    };

    const updateTheme = (field: keyof ResumeTheme, value: string) => {
        setData(prev => ({ ...prev, theme: { ...prev.theme, [field]: value } }));
    };

    const handlePrint = () => window.print();

    // Calculate progress
    const progress = (activeStep / STEPS.length) * 100;

    return (
        <Section className="min-h-screen flex flex-col items-center print:p-0 print:block bg-slate-50/50">
            <div className="print:hidden w-full flex flex-col items-center">
                <ToolHeader//
                    title="Professional Resume Builder"//
                    description="Create a stunning, ATS-friendly resume in minutes. Choose from premium templates and customize to match your style."//
                />
            </div>

            <div className="w-full max-w-[1600px] gap-8 print:block print:w-full print:max-w-none px-4 lg:px-8">

                {/* Desktop Split Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left: Editor Panel */}
                    <div className="w-full lg:w-[45%] xl:w-[40%] print:hidden flex flex-col gap-6">

                        {/* Progress Stepper */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 sticky top-4 z-20">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                                        {activeStep}
                                    </span>
                                    {STEPS.find(s => s.id === activeStep)?.title}
                                </h2>
                                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
                                <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveStep(p => Math.max(1, p - 1))}
                                    disabled={activeStep === 1}
                                    className="flex-1 py-2.5 rounded-xl border font-medium hover:bg-muted disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <button
                                    onClick={() => setActiveStep(p => Math.min(STEPS.length, p + 1))}
                                    disabled={activeStep === STEPS.length}
                                    className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
                                >
                                    {activeStep === STEPS.length ? "Finish" : "Next"} <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-border/50 min-h-[500px]">
                            {activeStep === 1 && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label="Full Name" value={data.fullName} onChange={(v: string) => handleInputChange('fullName', v)} placeholder="John Doe" icon={User} />
                                        <InputGroup label="Job Title" value={data.summary} onChange={(v: string) => handleInputChange('summary', v)} placeholder="Software Engineer" icon={Briefcase} />
                                    </div>
                                    <InputGroup label="Email" value={data.email} onChange={(v: string) => handleInputChange('email', v)} placeholder="john@example.com" icon={User} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label="Phone" value={data.phone} onChange={(v: string) => handleInputChange('phone', v)} placeholder="+1 234 567 890" icon={User} />
                                        <InputGroup label="Location" value={data.location} onChange={(v: string) => handleInputChange('location', v)} placeholder="New York, NY" icon={User} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label="LinkedIn" value={data.linkedin} onChange={(v: string) => handleInputChange('linkedin', v)} placeholder="linkedin.com/in/johndoe" icon={Monitor} />
                                        <InputGroup label="GitHub" value={data.github} onChange={(v: string) => handleInputChange('github', v)} placeholder="github.com/johndoe" icon={Monitor} />
                                    </div>
                                    <InputGroup label="Portfolio / Website" value={data.portfolio} onChange={(v: string) => handleInputChange('portfolio', v)} placeholder="johndoe.com" icon={Monitor} />
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="space-y-6">
                                    {data.education.map((edu, idx) => (
                                        <div key={edu.id} className="p-5 rounded-2xl bg-muted/40 border hover:border-primary/20 transition-colors relative group">
                                            <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                <InputGroup label="School / University" value={edu.school} onChange={(v: string) => handleArrayChange('education', edu.id, 'school', v)} />
                                                <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => handleArrayChange('education', edu.id, 'degree', v)} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Start Date" value={edu.startDate} onChange={(v: string) => handleArrayChange('education', edu.id, 'startDate', v)} placeholder="MM/YYYY" />
                                                    <InputGroup label="End Date" value={edu.endDate} onChange={(v: string) => handleArrayChange('education', edu.id, 'endDate', v)} placeholder="MM/YYYY" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('education')} className="w-full py-4 border-2 border-dashed border-primary/10 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Education
                                    </button>
                                </div>
                            )}

                            {activeStep === 3 && (
                                <div className="space-y-6">
                                    {data.experience.map((exp, idx) => (
                                        <div key={exp.id} className="p-5 rounded-2xl bg-muted/40 border hover:border-primary/20 transition-colors relative group">
                                            <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                <InputGroup label="Company" value={exp.company} onChange={(v: string) => handleArrayChange('experience', exp.id, 'company', v)} />
                                                <InputGroup label="Position" value={exp.position} onChange={(v: string) => handleArrayChange('experience', exp.id, 'position', v)} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputGroup label="Start Date" value={exp.startDate} onChange={(v: string) => handleArrayChange('experience', exp.id, 'startDate', v)} placeholder="MM/YYYY" />
                                                    <InputGroup label="End Date" value={exp.endDate} onChange={(v: string) => handleArrayChange('experience', exp.id, 'endDate', v)} placeholder="MM/YYYY" />
                                                </div>
                                                <InputGroup label="Description" value={exp.description} onChange={(v: string) => handleArrayChange('experience', exp.id, 'description', v)} textarea placeholder="• Achieved X..." />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('experience')} className="w-full py-4 border-2 border-dashed border-primary/10 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Job
                                    </button>
                                </div>
                            )}

                            {activeStep === 4 && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-blue-50 text-blue-800 rounded-xl text-sm mb-4">
                                        Tip: List your most relevant skills for the job you want.
                                    </div>
                                    <InputGroup label="Skills (comma separated)" value={data.skills} onChange={(v: string) => handleInputChange('skills', v)} textarea placeholder="React, Node.js, TypeScript, Python..." />
                                </div>
                            )}

                            {activeStep === 5 && (
                                <div className="space-y-6">
                                    {data.projects.map((proj, idx) => (
                                        <div key={proj.id} className="p-5 rounded-2xl bg-muted/40 border hover:border-primary/20 transition-colors relative group">
                                            <button onClick={() => removeItem('projects', proj.id)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><FileText className="w-4 h-4" /> Project #{idx + 1}</h3>
                                            <InputGroup label="Project Name" value={proj.name} onChange={(v: string) => handleArrayChange('projects', proj.id, 'name', v)} />
                                            <div className="mt-4">
                                                <InputGroup label="Link (optional)" value={proj.link} onChange={(v: string) => handleArrayChange('projects', proj.id, 'link', v)} placeholder="https://..." />
                                            </div>
                                            <div className="mt-4">
                                                <InputGroup label="Description" value={proj.description} onChange={(v: string) => handleArrayChange('projects', proj.id, 'description', v)} textarea />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-primary/10 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Project
                                    </button>
                                </div>
                            )}

                            {activeStep === 6 && (
                                <div className="space-y-6">
                                    {data.certifications.map((cert, idx) => (
                                        <div key={cert.id} className="p-5 rounded-2xl bg-muted/40 border hover:border-primary/20 transition-colors relative group">
                                            <button onClick={() => removeItem('certifications', cert.id)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><Award className="w-4 h-4" /> Certification #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                <InputGroup label="Certification Name" value={cert.name} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'name', v)} />
                                                <InputGroup label="Issuer" value={cert.issuer} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'issuer', v)} />
                                                <InputGroup label="Date" value={cert.date} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'date', v)} placeholder="YYYY" />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('certifications')} className="w-full py-4 border-2 border-dashed border-primary/10 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Certification
                                    </button>
                                </div>
                            )}

                            {activeStep === 7 && (
                                <div className="space-y-8">
                                    {/* Template Selection */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-widest">Layout Template</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {TEMPLATES.map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => updateTheme('template', t.id)}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                                                        data.theme.template === t.id ? "border-primary bg-primary/5 text-primary" : "border-muted hover:border-primary/50 text-muted-foreground"
                                                    )}
                                                >
                                                    <t.icon className="w-6 h-6" />
                                                    <span className="font-semibold">{t.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color Selection */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-widest">Accent Color</label>
                                        <div className="flex flex-wrap gap-3">
                                            {COLORS.map(c => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => updateTheme('color', c.id)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                                                        data.theme.color === c.id ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                                                    )}
                                                    style={{ backgroundColor: c.value }}
                                                    title={c.name}
                                                >
                                                    {data.theme.color === c.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Font Selection */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-widest">Typography</label>
                                        <div className="space-y-2">
                                            {FONTS.map(f => (
                                                <button
                                                    key={f.id}
                                                    onClick={() => updateTheme('font', f.id)}
                                                    className={cn(
                                                        "w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all",
                                                        data.theme.font === f.id ? "border-primary bg-primary/5 text-primary" : "border-muted hover:bg-muted/50"
                                                    )}
                                                >
                                                    <span className={cn("text-lg", f.class)}>Abc</span>
                                                    <span className="font-medium">{f.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reorder Sections */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-widest">Reorder Sections</label>
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <SortableContext
                                                items={data.sectionOrder}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {data.sectionOrder.map((section) => (
                                                    <SortableItem key={section} id={section} icon={
                                                        section === 'experience' ? Briefcase :
                                                            section === 'education' ? GraduationCap :
                                                                section === 'projects' ? FileText :
                                                                    section === 'skills' ? Monitor :
                                                                        section === 'certifications' ? Award : User
                                                    } />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    </div>
                                </div>
                            )}

                            {activeStep === 8 && (
                                <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
                                    <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 animate-bounce">
                                        <Download className="w-12 h-12" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h2 className="text-3xl font-black text-foreground">Ready to Export!</h2>
                                        <p className="text-muted-foreground max-w-md mx-auto">
                                            Your professional resume is ready. Download it now or go back to make final tweaks.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handlePrint}
                                        className="px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-3"
                                    >
                                        <Download className="w-6 h-6" /> Download PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Live Preview Panel */}
                    <div className="w-full lg:w-[55%] xl:w-[60%] hidden lg:block sticky top-4 h-[calc(100vh-2rem)] overflow-hidden rounded-3xl bg-slate-200/50 border border-slate-300/50 shadow-inner flex flex-col">
                        <div className="p-4 border-b bg-white/50 backdrop-blur-sm flex justify-between items-center">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                <Monitor className="w-4 h-4" /> Live Preview
                            </h3>
                            <button onClick={handlePrint} className="text-xs font-medium text-primary hover:underline">
                                Preview PDF
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-slate-200/50">
                            <div className="w-full max-w-[500px]">
                                <ResumePreview data={data} targetRef={resumeRef} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Preview Button (Floating) */}
                    <div className="fixed bottom-4 right-4 lg:hidden z-50 print:hidden">
                        <button
                            onClick={handlePrint}
                            className="bg-primary text-primary-foreground p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold"
                        >
                            <Monitor className="w-5 h-5" /> Preview PDF
                        </button>
                    </div>

                </div>
            </div>

            {/* Print Styles Injection */}
            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { background: white; }
                    nav, footer, header, aside, .print\\:hidden { display: none !important; }
                    .print\\:block { display: block !important; }
                    .print\\:w-full { width: 100% !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    #resume-preview {
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        transform: none !important;
                        overflow: hidden !important;
                    }
                }
            `}</style>

            {/* SEO Content Section matches previous implementation but cleaner */}
            <div className="print:hidden w-full max-w-4xl prose prose-slate prose-lg dark:prose-invert my-24 px-4">
                <h2>Create a Professional Resume for Free</h2>
                <p>
                    Building a resume shouldn't be a hassle. Imgverto's <strong>Free Online Resume Builder</strong> helps you create a structured,
                    ATS-friendly resume in just a few minutes. Whether you are a fresh graduate or an experienced professional, our tool guides you through
                    each section to ensure you don't miss any critical details.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
                    {[
                        { title: "ATS Friendly", icon: Monitor, desc: "Designed to pass automated screening software." },
                        { title: "Real-time Preview", icon: Monitor, desc: "See your changes instantly as you type." },
                        { title: "Premium Templates", icon: Layout, desc: "Professional designs for every career." },
                    ].map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm">
                            <f.icon className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-black text-foreground mb-2">{f.title}</h4>
                            <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <h3>Why use our Resume Builder?</h3>
                <ul>
                    <li><strong>No Sign-up Required:</strong> Start building immediately. We don't store your data.</li>
                    <li><strong>Professional Customization:</strong> Choose specific fonts, accent colors, and layouts.</li>
                    <li><strong>Instant PDF Export:</strong> Download your finished resume with a single click.</li>
                </ul>
            </div>

            <div className="print:hidden w-full max-w-4xl px-4 pb-20">
                <FAQSection items={[
                    { question: "Is this resume builder free?", answer: "Yes, it is completely free. There are no paywalls or premium features." },
                    { question: "Is the resume ATS friendly?", answer: "Yes, we use a standard hierarchical structure that Applicant Tracking Systems (ATS) can easily parse." },
                    { question: "Do you save my data?", answer: "No, all processing happens in your browser. We do not store your personal information on our servers." },
                    { question: "Can I switch templates later?", answer: "Yes! You can switch between templates, fonts, and colors at any time without losing your content." },
                    { question: "What file format is the download?", answer: "You can download your resume as a standard PDF file." }
                ]} />

                <RelatedTools currentPath="/resume-builder" />
            </div>
        </Section>
    );
}
