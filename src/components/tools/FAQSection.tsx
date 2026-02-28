import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
    const faqSchemaData = {
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-8 max-w-2xl mx-auto w-full">
            <SchemaMarkup type="FAQPage" data={faqSchemaData} />
            <h2 className="text-2xl font-extrabold text-center mb-6 tracking-tight text-slate-900">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground whitespace-pre-line">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
