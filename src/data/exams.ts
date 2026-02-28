import { Briefcase, GraduationCap, Building2, FileText, Building } from "lucide-react";
import React from "react";

export type ImageRequirement = {
    type: "Photo" | "Signature" | "Thumbprint" | "Other";
    widthPx?: number;
    heightPx?: number;
    widthCm?: number;
    heightCm?: number;
    minSizeKb: number;
    maxSizeKb: number;
    format: string[];
    dpi?: number;
    notes?: string;
};

export type ExamData = {
    id: string;
    title: string;
    category: "UPSC" | "SSC" | "Banking" | "Railways" | "Defense" | "Medical & Engineering" | "State PSC" | "Boards" | "Govt Schemes" | "Other";
    icon: React.ElementType;
    description: string;
    requirements: ImageRequirement[];
};

export const categories = [
    { name: "Medical & Engineering", icon: GraduationCap },
    { name: "UPSC", icon: Building2 },
    { name: "SSC", icon: Briefcase },
    { name: "Banking", icon: Building },
    { name: "Railways", icon: Building2 },
    { name: "Defense", icon: Building2 },
    { name: "State PSC", icon: FileText },
    { name: "Boards", icon: GraduationCap },
    { name: "Govt Schemes", icon: FileText }
];

export const examDatabase: ExamData[] = [
    // Medical & Engineering
    {
        id: "neet-ug",
        title: "NEET (UG)",
        category: "Medical & Engineering",
        icon: GraduationCap,
        description: "National Eligibility cum Entrance Test for Medical courses.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 10,
                maxSizeKb: 200,
                format: ["jpg", "jpeg"],
                notes: "Must be a recent passport size photograph with 80% face coverage, ears clearly visible, on white background."
            },
            {
                type: "Signature",
                widthCm: 3.5,
                heightCm: 1.5,
                minSizeKb: 4,
                maxSizeKb: 30,
                format: ["jpg", "jpeg"],
                notes: "Signature should be on white paper with Black Ink pen."
            },
            {
                type: "Thumbprint",
                minSizeKb: 10,
                maxSizeKb: 200,
                format: ["jpg", "jpeg"],
                notes: "Left hand thumb impression on white paper with Blue Ink."
            }
        ]
    },
    {
        id: "jee-main",
        title: "JEE Main",
        category: "Medical & Engineering",
        icon: GraduationCap,
        description: "Joint Entrance Examination for Engineering courses.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 10,
                maxSizeKb: 200,
                format: ["jpg", "jpeg"],
                notes: "Recent photograph (either in colour or black & white with 80% face visible including ears against white background)."
            },
            {
                type: "Signature",
                widthCm: 3.5,
                heightCm: 1.5,
                minSizeKb: 4,
                maxSizeKb: 30,
                format: ["jpg", "jpeg"]
            }
        ]
    },
    // UPSC
    {
        id: "upsc-cse",
        title: "UPSC Civil Services (IAS)",
        category: "UPSC",
        icon: Building2,
        description: "Civil Services Examination by the Union Public Service Commission.",
        requirements: [
            {
                type: "Photo",
                widthPx: 350,
                heightPx: 350,
                minSizeKb: 20,
                maxSizeKb: 300,
                format: ["jpg", "jpeg"],
                notes: "Resolution must be min 350x350 and max 1000x1000 pixels. The name of the candidate and the date on which the photograph was taken must be clearly mentioned on the photograph."
            },
            {
                type: "Signature",
                widthPx: 350,
                heightPx: 350,
                minSizeKb: 20,
                maxSizeKb: 300,
                format: ["jpg", "jpeg"],
                notes: "Resolution must be min 350x350 and max 1000x1000 pixels."
            }
        ]
    },
    {
        id: "nda-na",
        title: "NDA & NA",
        category: "Defense",
        icon: Building2,
        description: "National Defence Academy and Naval Academy Examination.",
        requirements: [
            {
                type: "Photo",
                widthPx: 350,
                heightPx: 350,
                minSizeKb: 20,
                maxSizeKb: 300,
                format: ["jpg", "jpeg"]
            },
            {
                type: "Signature",
                widthPx: 350,
                heightPx: 350,
                minSizeKb: 20,
                maxSizeKb: 300,
                format: ["jpg", "jpeg"]
            }
        ]
    },
    // SSC
    {
        id: "ssc-cgl",
        title: "SSC CGL",
        category: "SSC",
        icon: Briefcase,
        description: "Staff Selection Commission Combined Graduate Level Examination.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 20,
                maxSizeKb: 50,
                format: ["jpg", "jpeg"],
                notes: "Recent scanned colour passport size photograph. The photograph should be without cap and spectacles. Frontal view of the face should be clearly visible."
            },
            {
                type: "Signature",
                widthCm: 4.0,
                heightCm: 2.0,
                minSizeKb: 10,
                maxSizeKb: 20,
                format: ["jpg", "jpeg"]
            }
        ]
    },
    // Banking
    {
        id: "ibps-po",
        title: "IBPS PO / Clerk",
        category: "Banking",
        icon: Building,
        description: "Institute of Banking Personnel Selection for Probationary Officers and Clerks.",
        requirements: [
            {
                type: "Photo",
                widthCm: 4.5,
                heightCm: 3.5,
                widthPx: 200,
                heightPx: 230,
                minSizeKb: 20,
                maxSizeKb: 50,
                format: ["jpg", "jpeg"],
                notes: "Dimensions 200 x 230 pixels (preferred)."
            },
            {
                type: "Signature",
                widthPx: 140,
                heightPx: 60,
                minSizeKb: 10,
                maxSizeKb: 20,
                format: ["jpg", "jpeg"],
                notes: "Signature on white paper with Black Ink pen. Dimensions 140 x 60 pixels (preferred). Signature in CAPITAL LETTERS shall NOT be accepted."
            },
            {
                type: "Thumbprint",
                widthPx: 240,
                heightPx: 240,
                minSizeKb: 20,
                maxSizeKb: 50,
                format: ["jpg", "jpeg"],
                notes: "Left thumb impression on white paper with black or blue ink."
            },
            {
                type: "Other",
                widthPx: 800,
                heightPx: 400,
                minSizeKb: 50,
                maxSizeKb: 100,
                format: ["jpg", "jpeg"],
                notes: "Handwritten declaration on white paper with black ink."
            }
        ]
    },
    {
        id: "sbi-po",
        title: "SBI PO / Clerk",
        category: "Banking",
        icon: Building,
        description: "State Bank of India Probationary Officer and Clerk Recruitment.",
        requirements: [
            {
                type: "Photo",
                widthPx: 200,
                heightPx: 230,
                minSizeKb: 20,
                maxSizeKb: 50,
                format: ["jpg", "jpeg"]
            },
            {
                type: "Signature",
                widthPx: 140,
                heightPx: 60,
                minSizeKb: 10,
                maxSizeKb: 20,
                format: ["jpg", "jpeg"],
                notes: "Signature in running handwriting. NO capital letters."
            }
        ]
    },
    // Railways
    {
        id: "rrb-ntpc",
        title: "RRB NTPC / Group D",
        category: "Railways",
        icon: Building2,
        description: "Railway Recruitment Board Non-Technical Popular Categories.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 30,
                maxSizeKb: 70,
                format: ["jpg", "jpeg"],
                notes: "Color passport photograph with white background. Name and Date printed on the photo."
            },
            {
                type: "Signature",
                widthCm: 5.0,
                heightCm: 2.0,
                minSizeKb: 30,
                maxSizeKb: 70,
                format: ["jpg", "jpeg"],
                notes: "Signature in running hand, not in block/capital or disjointed letters."
            }
        ]
    },
    // Govt Schemes
    {
        id: "ayushman-bharat",
        title: "Ayushman Bharat PM-JAY",
        category: "Govt Schemes",
        icon: FileText,
        description: "Pradhan Mantri Jan Arogya Yojana application.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 10,
                maxSizeKb: 100,
                format: ["jpg", "jpeg", "png"],
                notes: "Clear frontline face covering 80% of photo."
            },
            {
                type: "Other",
                minSizeKb: 50,
                maxSizeKb: 200,
                format: ["jpg", "jpeg", "pdf"],
                notes: "Scanned copy of Aadhar card or ration card for KYC verification."
            }
        ]
    },
    {
        id: "pm-kisan",
        title: "PM Kisan Samman Nidhi",
        category: "Govt Schemes",
        icon: FileText,
        description: "Income support scheme for farmers.",
        requirements: [
            {
                type: "Other",
                minSizeKb: 50,
                maxSizeKb: 200,
                format: ["jpg", "jpeg", "pdf"],
                notes: "Land ownership records (Khatauni) size must not exceed 200KB."
            },
            {
                type: "Other",
                minSizeKb: 50,
                maxSizeKb: 100,
                format: ["jpg", "jpeg", "pdf"],
                notes: "Bank passbook front page scan."
            }
        ]
    },
    // State PSC
    {
        id: "state-psc",
        title: "State PSC (UPPSC, BPSC, MPSC)",
        category: "State PSC",
        icon: FileText,
        description: "Public Service Commission exams for various Indian states.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 20,
                maxSizeKb: 50,
                format: ["jpg", "jpeg"],
                notes: "Standard size for most state commissions. UPPSC requires name/date stamp."
            },
            {
                type: "Signature",
                widthCm: 3.5,
                heightCm: 1.5,
                minSizeKb: 10,
                maxSizeKb: 20,
                format: ["jpg", "jpeg"]
            }
        ]
    },
    // Boards
    {
        id: "board-exams",
        title: "Board Exams (CBSE, ICSE, NIOS)",
        category: "Boards",
        icon: GraduationCap,
        description: "Class 10th and 12th board registration for major national boards.",
        requirements: [
            {
                type: "Photo",
                widthCm: 3.5,
                heightCm: 4.5,
                minSizeKb: 10,
                maxSizeKb: 40,
                format: ["jpg", "jpeg"],
                notes: "Check specific board limits (CBSE: 40KB, NIOS: 50KB)."
            },
            {
                type: "Signature",
                widthCm: 3.5,
                heightCm: 1.5,
                minSizeKb: 10,
                maxSizeKb: 20,
                format: ["jpg", "jpeg"]
            }
        ]
    }
];
