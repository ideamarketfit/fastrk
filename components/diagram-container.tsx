import React, { ReactNode, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';

interface DiagramContainerProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  diagramContent?: string;
}

const DiagramContainer = ({
  title,
  onClose,
  showBackButton = false,
  diagramContent
}: DiagramContainerProps) => {
  const [isPanelReady, setIsPanelReady] = useState(false);

  useEffect(() => {
    const element = document.getElementById('diagram-panel');
    
    const handleAnimationEnd = () => {
      setIsPanelReady(true);
    };

    if (element) {
      element.addEventListener('animationend', handleAnimationEnd);
      element.addEventListener('transitionend', handleAnimationEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('animationend', handleAnimationEnd);
        element.removeEventListener('transitionend', handleAnimationEnd);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPanelReady || !diagramContent) return;

    const element = document.getElementById('mermaid-diagram');
    if (element) {
      mermaid.initialize({ startOnLoad: false });
      
      mermaid.render('mermaid-svg', diagramContent)
        .then(({ svg }) => {
          element.innerHTML = svg;
          
          const svgElement = element.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';

            try {
              const panZoom = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: false,
                center: true,
                minZoom: 0.1,
                maxZoom: 10,
                zoomScaleSensitivity: 0.5,
              });

              setTimeout(() => {
                panZoom.zoom(0.7);
                panZoom.center();
              }, 100);

              const resizeObserver = new ResizeObserver(() => {
                panZoom.resize();
                panZoom.center();
              });
              resizeObserver.observe(element);

              return () => {
                panZoom.destroy();
                resizeObserver.disconnect();
              };
            } catch (error) {
              console.error('Error initializing pan-zoom:', error);
            }
          }
        })
        .catch(error => {
          console.error('Error rendering mermaid diagram:', error);
        });
    }
  }, [diagramContent, isPanelReady]);

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
    <div 
      id="diagram-panel"
      className="flex flex-col h-full bg-muted p-4 rounded-lg m-4 shadow-lg relative animate-in slide-in-from-right"
    >
      {/* Diagram Panel Header */}
      <div className="flex items-center justify-between mx-2 mb-4">
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
      <div className="flex-grow flex items-center justify-center overflow-auto min-h-[400px]">
        <div 
          id="mermaid-diagram" 
          className="w-full h-full flex items-center justify-center"
          style={{ minHeight: '400px' }}
        />
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