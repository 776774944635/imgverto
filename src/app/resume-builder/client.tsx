"use client";

import { useState, useRef } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Plus, Trash2, ChevronLeft, ChevronRight, User, Briefcase, GraduationCap, Award, Monitor, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    sectionOrder: ['experience', 'education', 'projects', 'skills', 'certifications']
};

// --- Steps Configuration ---

const STEPS = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Education", icon: GraduationCap },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Skills", icon: Monitor },
    { id: 4, title: "Skills", icon: Monitor },
    { id: 5, title: "Projects", icon: FileText },
    { id: 6, title: "Certifications", icon: Award },
    { id: 7, title: "Customize", icon: Monitor },
    { id: 8, title: "Finish", icon: Award },
];

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
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-white rounded-xl border shadow-sm mb-3 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
            <span className="font-semibold capitalize text-foreground/80 flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg"><props.icon className="w-4 h-4" /></div>
                {props.id}
            </span>
            <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">Drag to move</div>
        </div>
    );
}

const InputGroup = ({ label, value, onChange, placeholder, type = "text", textarea = false }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground/80">{label}</label>
        {textarea ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]"
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
            />
        )}
    </div>
);

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

                return {
                    ...prev,
                    sectionOrder: arrayMove(prev.sectionOrder, oldIndex, newIndex),
                };
            });
        }
    };

    // --- Handlers ---

    const handleInputChange = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (
        section: 'education' | 'experience' | 'projects' | 'certifications',
        id: string,
        field: string,
        value: string
    ) => {
        setData(prev => ({
            ...prev,
            [section]: prev[section].map((item: any) =>
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

        setData(prev => ({
            ...prev,
            [section]: [...prev[section], newItems[section]]
        }));
    };

    const removeItem = (section: 'education' | 'experience' | 'projects' | 'certifications', id: string) => {
        setData(prev => ({
            ...prev,
            [section]: prev[section].filter((item: any) => item.id !== id)
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    // --- Render Helpers ---

    // --- Render Helpers ---



    return (
        <Section className="min-h-screen flex flex-col items-center print:p-0 print:block">
            <div className="print:hidden w-full flex flex-col items-center">
                <ToolHeader
                    title="Free Resume Builder"
                    description="Create a professional, ATS-friendly resume in minutes. No sign-up required."
                />

                {/* Stepper */}
                <div className="w-full max-w-4xl mb-12 overflow-x-auto pb-4">
                    <div className="flex justify-between items-center min-w-[600px] px-4">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === step.id;
                            const isCompleted = activeStep > step.id;

                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <button
                                        onClick={() => setActiveStep(step.id)}
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all mb-2",
                                            isActive ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg" :
                                                isCompleted ? "bg-primary/10 border-primary text-primary" :
                                                    "bg-white border-muted text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </button>
                                    <span className={cn(
                                        "text-xs font-bold uppercase tracking-wider",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {step.title}
                                    </span>
                                    {index < STEPS.length - 1 && (
                                        <div className={cn(
                                            "absolute top-6 left-1/2 w-[calc(100%_-_2rem)] h-0.5 -z-10",
                                            activeStep > step.id ? "bg-primary" : "bg-muted"
                                        )} style={{ width: "200%", left: "50%" }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:w-full print:max-w-none">

                {/* Editor Panel */}
                <div className="print:hidden space-y-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-border/50">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                                {STEPS.find(s => s.id === activeStep)?.title} Details
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveStep(p => Math.max(1, p - 1))}
                                    disabled={activeStep === 1}
                                    className="p-2 rounded-lg border hover:bg-muted disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setActiveStep(p => Math.min(STEPS.length, p + 1))}
                                    disabled={activeStep === STEPS.length}
                                    className="p-2 rounded-lg border hover:bg-muted disabled:opacity-50"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="space-y-6 min-h-[400px]">
                            {activeStep === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="Full Name" value={data.fullName} onChange={(v: string) => handleInputChange('fullName', v)} placeholder="John Doe" />
                                    <InputGroup label="Job Title" value={data.summary} onChange={(v: string) => handleInputChange('summary', v)} placeholder="Software Engineer" />
                                    <InputGroup label="Email" value={data.email} onChange={(v: string) => handleInputChange('email', v)} placeholder="john@example.com" />
                                    <InputGroup label="Phone" value={data.phone} onChange={(v: string) => handleInputChange('phone', v)} placeholder="+1 234 567 890" />
                                    <InputGroup label="Location" value={data.location} onChange={(v: string) => handleInputChange('location', v)} placeholder="New York, NY" />
                                    <InputGroup label="LinkedIn" value={data.linkedin} onChange={(v: string) => handleInputChange('linkedin', v)} placeholder="linkedin.com/in/johndoe" />
                                    <InputGroup label="GitHub" value={data.github} onChange={(v: string) => handleInputChange('github', v)} placeholder="github.com/johndoe" />
                                    <div className="md:col-span-2">
                                        <InputGroup label="Portfolio / Website" value={data.portfolio} onChange={(v: string) => handleInputChange('portfolio', v)} placeholder="johndoe.com" />
                                    </div>
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="space-y-6">
                                    {data.education.map((edu, idx) => (
                                        <div key={edu.id} className="p-4 rounded-2xl bg-muted/30 border relative group">
                                            <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary">Education #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputGroup label="School / University" value={edu.school} onChange={(v: string) => handleArrayChange('education', edu.id, 'school', v)} />
                                                <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => handleArrayChange('education', edu.id, 'degree', v)} />
                                                <InputGroup label="Start Date" value={edu.startDate} onChange={(v: string) => handleArrayChange('education', edu.id, 'startDate', v)} placeholder="MM/YYYY" />
                                                <InputGroup label="End Date" value={edu.endDate} onChange={(v: string) => handleArrayChange('education', edu.id, 'endDate', v)} placeholder="MM/YYYY or Present" />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('education')} className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Education
                                    </button>
                                </div>
                            )}

                            {activeStep === 3 && (
                                <div className="space-y-6">
                                    {data.experience.map((exp, idx) => (
                                        <div key={exp.id} className="p-4 rounded-2xl bg-muted/30 border relative group">
                                            <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary">Experience #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputGroup label="Company" value={exp.company} onChange={(v: string) => handleArrayChange('experience', exp.id, 'company', v)} />
                                                <InputGroup label="Position" value={exp.position} onChange={(v: string) => handleArrayChange('experience', exp.id, 'position', v)} />
                                                <InputGroup label="Start Date" value={exp.startDate} onChange={(v: string) => handleArrayChange('experience', exp.id, 'startDate', v)} placeholder="MM/YYYY" />
                                                <InputGroup label="End Date" value={exp.endDate} onChange={(v: string) => handleArrayChange('experience', exp.id, 'endDate', v)} placeholder="MM/YYYY or Present" />
                                                <div className="md:col-span-2">
                                                    <InputGroup label="Description" value={exp.description} onChange={(v: string) => handleArrayChange('experience', exp.id, 'description', v)} textarea placeholder="• Achieved X..." />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('experience')} className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Job
                                    </button>
                                </div>
                            )}

                            {activeStep === 4 && (
                                <div className="space-y-6">
                                    <InputGroup label="Skills (comma separated)" value={data.skills} onChange={(v: string) => handleInputChange('skills', v)} textarea placeholder="React, Node.js, TypeScript, Python..." />
                                </div>
                            )}

                            {activeStep === 5 && (
                                <div className="space-y-6">
                                    {data.projects.map((proj, idx) => (
                                        <div key={proj.id} className="p-4 rounded-2xl bg-muted/30 border relative group">
                                            <button onClick={() => removeItem('projects', proj.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary">Project #{idx + 1}</h3>
                                            <InputGroup label="Project Name" value={proj.name} onChange={(v: string) => handleArrayChange('projects', proj.id, 'name', v)} />
                                            <div className="mt-4">
                                                <InputGroup label="Description" value={proj.description} onChange={(v: string) => handleArrayChange('projects', proj.id, 'description', v)} textarea />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Project
                                    </button>
                                </div>
                            )}

                            {activeStep === 6 && (
                                <div className="space-y-6">
                                    {data.certifications.map((cert, idx) => (
                                        <div key={cert.id} className="p-4 rounded-2xl bg-muted/30 border relative group">
                                            <button onClick={() => removeItem('certifications', cert.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            <h3 className="font-bold mb-4 text-primary">Certification #{idx + 1}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputGroup label="Certification Name" value={cert.name} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'name', v)} />
                                                <InputGroup label="Issuer" value={cert.issuer} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'issuer', v)} />
                                                <InputGroup label="Date" value={cert.date} onChange={(v: string) => handleArrayChange('certifications', cert.id, 'date', v)} placeholder="YYYY" />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => addItem('certifications')} className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-colors">
                                        <Plus className="w-5 h-5" /> Add Certification
                                    </button>
                                </div>
                            )}

                            {activeStep === 7 && (
                                <div className="space-y-6">
                                    <p className="text-muted-foreground mb-4">Drag and drop sections to rearrange them on your resume.</p>
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
                                                                    section === 'certifications' ? Award :
                                                                        User
                                                } />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                </div>
                            )}

                            {activeStep === 8 && (
                                <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
                                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                        <Download className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-black text-center">Ready to Download!</h2>
                                    <p className="text-muted-foreground text-center max-w-md">
                                        Your resume is ready. Click the button below to download it as a PDF.
                                        You can also go back and make edits if needed.
                                    </p>
                                    <button
                                        onClick={handlePrint}
                                        className="px-10 py-5 bg-primary text-primary-foreground text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                                    >
                                        <Download className="w-6 h-6" /> Download PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview Panel - "The Paper" */}
                {/* We use a specific ID to target print styles if needed, though mostly relying on media print class logic */}
                <div className="bg-slate-100 p-8 rounded-[2.5rem] overflow-hidden shadow-inner print:p-0 print:bg-white print:shadow-none">
                    <div
                        ref={resumeRef}
                        id="resume-preview"
                        className="bg-white mx-auto shadow-2xl print:shadow-none aspect-[210/297] w-full max-w-[210mm] min-h-[297mm] p-[10mm] md:p-[20mm] text-slate-800 text-sm leading-relaxed"
                    >
                        {/* Header */}
                        <div className="border-b-2 border-slate-800 pb-6 mb-6">
                            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2 text-slate-900">
                                {data.fullName || "Your Name"}
                            </h1>
                            <div className="text-lg font-medium text-slate-600 mb-4">{data.summary || "Professional Title"}</div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-xs">
                                {data.email && <a href={`mailto:${data.email}`} className="hover:text-primary hover:underline">{data.email}</a>}
                                {data.phone && <a href={`tel:${data.phone}`} className="hover:text-primary hover:underline">• {data.phone}</a>}
                                {data.location && <span>• {data.location}</span>}
                                {data.linkedin && <a href={data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">• LinkedIn</a>}
                                {data.github && <a href={data.github.startsWith('http') ? data.github : `https://${data.github}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">• GitHub</a>}
                                {data.portfolio && <a href={data.portfolio.startsWith('http') ? data.portfolio : `https://${data.portfolio}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">• Portfolio</a>}
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="space-y-6">
                            {data.sectionOrder.map((section) => {
                                switch (section) {
                                    case 'experience':
                                        return data.experience.length > 0 && (
                                            <section key="experience">
                                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-800">Professional Experience</h2>
                                                <div className="space-y-4">
                                                    {data.experience.map((exp) => (
                                                        <div key={exp.id}>
                                                            <div className="flex justify-between items-baseline mb-1">
                                                                <h3 className="font-bold text-base">{exp.position}</h3>
                                                                <span className="text-slate-500 italic whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                                                            </div>
                                                            <div className="font-semibold text-slate-700 mb-2">{exp.company}</div>
                                                            <p className="whitespace-pre-line text-slate-600">{exp.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    case 'education':
                                        return data.education.length > 0 && (
                                            <section key="education">
                                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-800">Education</h2>
                                                <div className="space-y-3">
                                                    {data.education.map((edu) => (
                                                        <div key={edu.id}>
                                                            <div className="flex justify-between items-baseline">
                                                                <h3 className="font-bold">{edu.school}</h3>
                                                                <span className="text-slate-500 italic">{edu.startDate} – {edu.endDate}</span>
                                                            </div>
                                                            <div>{edu.degree}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    case 'projects':
                                        return data.projects.length > 0 && (
                                            <section key="projects">
                                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-800">Projects</h2>
                                                <div className="space-y-3">
                                                    {data.projects.map((proj) => (
                                                        <div key={proj.id}>
                                                            <div className="flex justify-between items-baseline">
                                                                <h3 className="font-bold">{proj.name}</h3>
                                                                {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Link</a>}
                                                            </div>
                                                            <p className="text-slate-600">{proj.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    case 'skills':
                                        return data.skills && (
                                            <section key="skills">
                                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-800">Skills</h2>
                                                <p className="text-slate-700 leading-normal">{data.skills}</p>
                                            </section>
                                        );
                                    case 'certifications':
                                        return data.certifications.length > 0 && (
                                            <section key="certifications">
                                                <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-800">Certifications</h2>
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
            </div>

            {/* Print Styles Injection */}
            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { background: white; }
                    nav, footer, header, aside { display: none !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:block { display: block !important; }
                    .print\\:w-full { width: 100% !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    #resume-preview {
                        width: 100% !important;
                        max-width: none !important;
                        min-height: 100vh !important;
                        margin: 0 !important;
                        padding: 20mm !important;
                        box-shadow: none !important;
                    }
                }
            `}</style>

            {/* Content & SEO Section */}
            <div className="print:hidden w-full max-w-3xl prose prose-slate prose-lg dark:prose-invert my-16">
                <h2>Create a Professional Resume for Free</h2>
                <p>
                    Building a resume shouldn't be a hassle. Imgverto's <strong>Free Online Resume Builder</strong> helps you create a structured,
                    ATS-friendly resume in just a few minutes. Whether you are a fresh graduate or an experienced professional, our tool guides you through
                    each section to ensure you don't miss any critical details.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
                    {[
                        { title: "ATS Friendly", icon: Monitor, desc: "Designed to pass automated screening software." },
                        { title: "Live Preview", icon: Monitor, desc: "See your changes instantly as you type." },
                        { title: "PDF Download", icon: Download, desc: "Standard format accepted everywhere." },
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
                    <li><strong>No Sign-up Required:</strong> Start building immediately. We don't store your data; it stays in your browser.</li>
                    <li><strong>Standard & Clean Layout:</strong> We use a classic, professional layout that recruiters love because it's easy to scan.</li>
                    <li><strong>Instant PDF Export:</strong> Download your finished resume with a single click in high-quality PDF format.</li>
                </ul>

                <h3>How to write a great resume?</h3>
                <p>
                    Focus on achievements rather than just duties. Use action verbs like "Achieved," "Developed," or "Managed." Keep your summary concise,
                    and tailor your skills section to the job description you are applying for. Our builder ensures your formatting stays consistent so you can focus on the content.
                </p>
            </div>

            <div className="print:hidden">
                <FAQSection items={[
                    { question: "Is this resume builder free?", answer: "Yes, it is completely free. There are no paywalls or premium features." },
                    { question: "Is the resume ATS friendly?", answer: "Yes, we use a standard hierarchical structure that Applicant Tracking Systems (ATS) can easily parse." },
                    { question: "Do you save my data?", answer: "No, all processing happens in your browser. We do not store your personal information on our servers." },
                    { question: "Can I edit my resume later?", answer: "Since we don't store your data, you must finish your resume in one session. If you close the tab, your progress will be lost." },
                    { question: "What file format is the download?", answer: "You can download your resume as a standard PDF file." }
                ]} />

                <RelatedTools currentPath="/resume-builder" />
            </div>
        </Section>
    );
}
