import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';

interface DiagramContainerProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  children: ReactNode;
}

const DiagramContainer = ({
  title,
  onClose,
  showBackButton = false,
  children
}: DiagramContainerProps) => {
  const handleExportDiagram = () => {
    const element = document.getElementById('mermaid-diagram');
    if (element) {
      html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        logging: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('mermaid-diagram');
          if (clonedElement) {
            clonedElement.style.width = '100%';
            clonedElement.style.height = '100%';
          }
        }
      }).then(canvas => {
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        const fileName = `${title || 'diagram'}.png`;
        downloadLink.download = fileName;
        downloadLink.href = pngFile;
        downloadLink.click();
      }).catch(error => {
        console.error('Error exporting diagram:', error);
      });
    } else {
      console.error('Diagram element not found');
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted p-4 rounded-lg m-4 shadow-lg relative">
      {/* Diagram Panel Header */}
      <div className="flex items-center justify-between mx-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleExportDiagram}>
            <Download className="h-4 w-4" />
            <span className="sr-only">Export diagram</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close diagram</span>
          </Button>
        </div>
      </div>
      
      {/* Diagram Content */}
      <div className="flex-grow flex items-center justify-center overflow-auto">
        {children}
      </div>

      {/* Back Button - Mobile Only */}
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="md:hidden absolute bottom-4 left-4"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back to chat</span>
        </Button>
      )}
    </div>
  );
};

export default DiagramContainer; 