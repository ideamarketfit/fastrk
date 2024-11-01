import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, X } from 'lucide-react';

interface DiagramContainerProps {
  title: string;
  onClose: () => void;
  onExport: () => void;
  showBackButton?: boolean;
  children: ReactNode;
}

const DiagramContainer = ({
  title,
  onClose,
  onExport,
  showBackButton = false,
  children
}: DiagramContainerProps) => {
  return (
    <div className="flex flex-col h-full bg-muted p-4 rounded-lg m-4 shadow-lg">
      {/* Diagram Panel Header */}
      <div className="flex items-center justify-between mx-2">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to chat</span>
            </Button>
          )}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onExport}>
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
    </div>
  );
};

export default DiagramContainer; 