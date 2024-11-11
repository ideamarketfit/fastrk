import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import DiagramDisplay from './diagram-display';
import { TiptapEditorComponent } from './tiptap-editor'
import { RevealSlideComponent } from './reveal-slide'

interface ArtifactPanelProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  showHeader?: boolean;
  artifactContent: string;
  type: 'diagram' | 'doc' | 'reveal-slides';
  className?: string;
}

const ArtifactPanel = ({
  title,
  onClose,
  showBackButton = false,
  showHeader = true,
  artifactContent,
  type = 'diagram',
  className
}: ArtifactPanelProps) => {
  const [isPanelReady, setIsPanelReady] = useState(false);

  useEffect(() => {
    const element = document.getElementById('artifact-panel');
    
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

  const handleExportArtifact = () => {
    const element = document.getElementById('artifact-content');
    if (!element) {
      console.error('Artifact element not found');
      return;
    }

    switch (type) {
      case 'diagram':
        html2canvas(element, {
          scale: 2,
          backgroundColor: null,
          logging: true,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('artifact-content');
            if (clonedElement) {
              clonedElement.style.width = '100%';
              clonedElement.style.height = '100%';
            }
          }
        }).then(canvas => {
          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          const fileName = `${title || 'artifact'}.png`;
          downloadLink.download = fileName;
          downloadLink.href = pngFile;
          downloadLink.click();
        }).catch(error => {
          console.error('Error exporting artifact:', error);
        });
        break;

      case 'doc':
        const blob = new Blob([artifactContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        const fileName = `${title || 'artifact'}.txt`;
        downloadLink.download = fileName;
        downloadLink.href = url;
        downloadLink.click();
        URL.revokeObjectURL(url);
        break;

      default:
        console.error('Unsupported artifact type for export:', type);
    }
  };

  const renderArtifactContent = () => {
    switch (type) {
      case 'diagram':
        return (
          <DiagramDisplay 
            diagramContent={artifactContent} 
            isPanelReady={isPanelReady}
          />
        );
      case 'doc':
        return (
          <TiptapEditorComponent
            content={artifactContent}
            editable={true}
            className="h-full"
          />
        );
      case 'reveal-slides':
        return (
          <RevealSlideComponent 
            content={artifactContent}
          />
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            Unsupported artifact type: {type}
          </div>
        );
    }
  };

  return (
    <div 
      id="artifact-panel"
      className={`flex flex-col h-full bg-muted p-4 rounded-lg m-4 shadow-lg relative animate-in slide-in-from-right ${className || ''}`}
    >
      {showHeader && (
        <div id="artifact-header" className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <h2 className="text-xl font-semibold truncate max-w-[calc(100%-4rem)]">{title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportArtifact}
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
            {!showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </div>
        </div>
      )}

      <div id="artifact-content" className="flex-grow overflow-hidden rounded-lg">
        {renderArtifactContent()}
      </div>
    </div>
  );
};

export default ArtifactPanel; 