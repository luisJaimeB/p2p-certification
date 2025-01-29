import { jsPDF } from "jspdf";

export const generatePDF = async (country, commerce, notificationUrl, siteUrl, email, fields) => {
  try {
    const pdf = new jsPDF();
    let yPosition = 20;

    pdf.setFontSize(16);
    if (country) {
      pdf.text(`País: ${country}`, 20, yPosition);
      yPosition += 10;
    }

    if (commerce) {
      pdf.text(`Comercio: ${commerce}`, 20, yPosition);
      yPosition += 10;
    }

    if (notificationUrl) {
      pdf.setFontSize(12);
      pdf.text(`URL de notificación: ${notificationUrl}`, 20, yPosition);
      yPosition += 10;
    }

    if (siteUrl) {
      pdf.text(`URL del sitio: ${siteUrl}`, 20, yPosition);
      yPosition += 20;
    }

    if (email) {
      pdf.text(`Correo electrónico: ${email}`, 20, yPosition);
      yPosition += 20;
    }

    for (const field of fields) {
      if (field.preview) {
        pdf.setFontSize(14);
        pdf.text(field.label, 20, yPosition);
        yPosition += 10;

        const imgWidth = 170;
        const imgHeight = 100;

        if (yPosition + imgHeight > pdf.internal.pageSize.height - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        try {
          await pdf.addImage(field.preview, "JPEG", 20, yPosition, imgWidth, imgHeight, undefined, "FAST");
          yPosition += imgHeight + 20;
        } catch (error) {
          console.error(`Error al agregar imagen ${field.label}:`, error);
        }
      }
    }

    pdf.save("certificacion.pdf");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Hubo un error al generar el PDF. Por favor, intente nuevamente.");
  }
};
