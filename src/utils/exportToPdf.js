import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = ({
  title = "Liste",
  fileName = "liste.pdf",
  columns = [],
  data = [],
}) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [columns.map((column) => column.header)],
    body: data.map((item, index) =>
      columns.map((column) => {
        if (column.accessor === "index") return index + 1;

        if (typeof column.accessor === "function") {
          return column.accessor(item, index) || "-";
        }

        return item[column.accessor] ?? "-";
      }),
    ),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [79, 70, 229],
    },
  });

  doc.save(fileName);
};
