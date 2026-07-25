import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportToDocx = async (questions, title = "Question Paper") => {
    if (!questions || questions.length === 0) return;

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: title,
                                bold: true,
                                size: 32,
                            }),
                        ],
                        spacing: {
                            after: 400,
                        },
                    }),
                    ...questions.map((q, index) => {
                        return new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${index + 1}. ${q.text}`,
                                    size: 24, // 12pt
                                }),
                            ],
                            spacing: {
                                after: 200,
                            },
                        });
                    }),
                ],
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Selected_Questions.docx");
};
