import type { PlanningData } from './planning-context';
import { format } from 'date-fns';

export async function exportPlanningDataToPDF(planningData: PlanningData) {
  // Dynamic import for client-side only
  if (typeof window === 'undefined') {
    throw new Error('PDF export is only available in the browser');
  }
  const jsPDF = (await import('jspdf')).default;
  const doc = new jsPDF();
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.text('My Roof Planning Summary', 20, yPos);
  yPos += 15;

  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy')}`, 20, yPos);
  yPos += 15;

  // Saved Roofers
  if (planningData.savedRoofers && planningData.savedRoofers.length > 0) {
    doc.setFontSize(16);
    doc.text('Saved Roofers', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    planningData.savedRoofers.forEach((roofer, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${roofer.name}`, 20, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      if (roofer.phone) {
        doc.text(`   Phone: ${roofer.phone}`, 25, yPos);
        yPos += 6;
      }
      if (roofer.email) {
        doc.text(`   Email: ${roofer.email}`, 25, yPos);
        yPos += 6;
      }
      if (roofer.websiteUrl) {
        doc.text(`   Website: ${roofer.websiteUrl}`, 25, yPos);
        yPos += 6;
      }
      if (roofer.contacted) {
        doc.text('   Status: Contacted', 25, yPos);
        yPos += 6;
      }
      if (roofer.quoteReceived) {
        doc.text('   Status: Quote Received', 25, yPos);
        yPos += 6;
      }
      if (roofer.notes) {
        doc.text(`   Notes: ${roofer.notes}`, 25, yPos);
        yPos += 6;
      }
      yPos += 5;
    });
    yPos += 5;
  }

  // Saved Locations
  if (planningData.savedLocations && planningData.savedLocations.length > 0) {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.text('Saved Locations', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    planningData.savedLocations.forEach((location, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${location.name} (${location.type})`, 20, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      if (location.notes) {
        doc.text(`   Notes: ${location.notes}`, 25, yPos);
        yPos += 6;
      }
      yPos += 5;
    });
    yPos += 5;
  }

  // Checklist
  if (yPos > 270) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(16);
  doc.text('Project Checklist', 20, yPos);
  yPos += 10;

  doc.setFontSize(10);
  const checklistItems = [
    { key: 'researchComplete', label: 'Research Complete' },
    { key: 'quotesReceived', label: 'Quotes Received' },
    { key: 'referencesChecked', label: 'References Checked' },
    { key: 'insuranceVerified', label: 'Insurance Verified' },
    { key: 'permitsObtained', label: 'Permits Obtained' },
    { key: 'materialsSelected', label: 'Materials Selected' },
    { key: 'timelineEstablished', label: 'Timeline Established' },
  ];

  checklistItems.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    const checked = planningData.checklist?.[item.key];
    doc.text(`${checked ? '✓' : '○'} ${item.label}`, 25, yPos);
    yPos += 6;
  });
  yPos += 5;

  // Timeline
  if (planningData.timeline?.startDate || planningData.timeline?.targetDate) {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.text('Project Timeline', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    if (planningData.timeline.startDate) {
      doc.text(
        `Start Date: ${format(new Date(planningData.timeline.startDate), 'MMMM dd, yyyy')}`,
        25,
        yPos
      );
      yPos += 6;
    }
    if (planningData.timeline.targetDate) {
      doc.text(
        `Target Completion: ${format(new Date(planningData.timeline.targetDate), 'MMMM dd, yyyy')}`,
        25,
        yPos
      );
      yPos += 6;
    }
    if (planningData.timeline.notes) {
      doc.text(`Notes: ${planningData.timeline.notes}`, 25, yPos);
      yPos += 6;
    }
    yPos += 5;
  }

  // Project Notes
  if (planningData.projectNotes) {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.text('Project Notes', 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    const notesLines = doc.splitTextToSize(planningData.projectNotes, 170);
    notesLines.forEach((line: string) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 25, yPos);
      yPos += 6;
    });
  }

  // Save PDF
  doc.save(`roof-planning-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}

export function generateEmailSummary(planningData: PlanningData): string {
  let emailBody = 'My Roof Planning Summary\n';
  emailBody += '========================\n\n';
  emailBody += `Generated: ${format(new Date(), 'MMMM dd, yyyy')}\n\n`;

  // Saved Roofers
  if (planningData.savedRoofers && planningData.savedRoofers.length > 0) {
    emailBody += 'SAVED ROOFERS:\n';
    emailBody += '--------------\n';
    planningData.savedRoofers.forEach((roofer, index) => {
      emailBody += `${index + 1}. ${roofer.name}\n`;
      if (roofer.phone) emailBody += `   Phone: ${roofer.phone}\n`;
      if (roofer.email) emailBody += `   Email: ${roofer.email}\n`;
      if (roofer.websiteUrl) emailBody += `   Website: ${roofer.websiteUrl}\n`;
      if (roofer.contacted) emailBody += `   Status: Contacted\n`;
      if (roofer.quoteReceived) emailBody += `   Status: Quote Received\n`;
      if (roofer.notes) emailBody += `   Notes: ${roofer.notes}\n`;
      emailBody += '\n';
    });
  }

  // Saved Locations
  if (planningData.savedLocations && planningData.savedLocations.length > 0) {
    emailBody += 'SAVED LOCATIONS:\n';
    emailBody += '----------------\n';
    planningData.savedLocations.forEach((location, index) => {
      emailBody += `${index + 1}. ${location.name} (${location.type})\n`;
      if (location.notes) emailBody += `   Notes: ${location.notes}\n`;
      emailBody += '\n';
    });
  }

  // Checklist
  emailBody += 'PROJECT CHECKLIST:\n';
  emailBody += '------------------\n';
  const checklistItems = [
    { key: 'researchComplete', label: 'Research Complete' },
    { key: 'quotesReceived', label: 'Quotes Received' },
    { key: 'referencesChecked', label: 'References Checked' },
    { key: 'insuranceVerified', label: 'Insurance Verified' },
    { key: 'permitsObtained', label: 'Permits Obtained' },
    { key: 'materialsSelected', label: 'Materials Selected' },
    { key: 'timelineEstablished', label: 'Timeline Established' },
  ];

  checklistItems.forEach((item) => {
    const checked = planningData.checklist?.[item.key];
    emailBody += `${checked ? '✓' : '○'} ${item.label}\n`;
  });
  emailBody += '\n';

  // Timeline
  if (planningData.timeline?.startDate || planningData.timeline?.targetDate) {
    emailBody += 'PROJECT TIMELINE:\n';
    emailBody += '-----------------\n';
    if (planningData.timeline.startDate) {
      emailBody += `Start Date: ${format(new Date(planningData.timeline.startDate), 'MMMM dd, yyyy')}\n`;
    }
    if (planningData.timeline.targetDate) {
      emailBody += `Target Completion: ${format(new Date(planningData.timeline.targetDate), 'MMMM dd, yyyy')}\n`;
    }
    if (planningData.timeline.notes) {
      emailBody += `Notes: ${planningData.timeline.notes}\n`;
    }
    emailBody += '\n';
  }

  // Project Notes
  if (planningData.projectNotes) {
    emailBody += 'PROJECT NOTES:\n';
    emailBody += '--------------\n';
    emailBody += `${planningData.projectNotes}\n\n`;
  }

  emailBody += '\n---\n';
  emailBody += 'Generated by RIF Roofing Planning Tool\n';
  emailBody += 'https://rifroofing.com/my-plan';

  return emailBody;
}

export function getEmailLink(planningData: PlanningData): string {
  const subject = encodeURIComponent('My Roof Planning Summary');
  const body = encodeURIComponent(generateEmailSummary(planningData));
  return `mailto:?subject=${subject}&body=${body}`;
}

















