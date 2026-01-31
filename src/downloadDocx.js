import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export function downloadDocx({ title, content, lang = "en", filename }) {
  const isArabic = lang === "ar";
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
                font: isArabic ? "Arial" : undefined,
                rightToLeft: isArabic,
              }),
            ],
            alignment: isArabic ? "right" : "left",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                font: isArabic ? "Arial" : undefined,
                rightToLeft: isArabic,
              }),
            ],
            alignment: isArabic ? "right" : "left",
          }),
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, filename);
  });
}
