import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';

interface DiagramDisplayProps {
  diagramContent: string;
  isPanelReady?: boolean;
  avoidDiagramSvgPanZoom?: boolean;
}

const DiagramDisplay = ({
  diagramContent,
  isPanelReady = true,
  avoidDiagramSvgPanZoom = false
}: DiagramDisplayProps) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPanelReady || !diagramContent || !diagramRef.current) return;
    setError(null);

    const element = diagramRef.current;
    const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      mermaid.parse(diagramContent);
    } catch (err) {
      console.error('Mermaid syntax error:', err);
      setError('Invalid diagram syntax. Please check your diagram code.');
      return;
    }
    
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontSize: 16,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      },
      suppressErrorRendering: true
    });
    
    mermaid.render(uniqueId, diagramContent)
      .then(({ svg }) => {
        element.innerHTML = svg;
        
        const svgElement = element.querySelector('svg');
        if (svgElement) {
          svgElement.style.width = '100%';
          svgElement.style.height = '100%';
          svgElement.style.maxWidth = '100%';
          svgElement.style.maxHeight = '100%';

          if (!avoidDiagramSvgPanZoom) {
            try {
              const panZoom = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: false,
                center: true,
                minZoom: 0.1,
                maxZoom: 10,
                zoomScaleSensitivity: 0.2,
              });

              setTimeout(() => {
                panZoom.zoom(0.8);
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
              setError('Error initializing diagram controls');
            }
          }
        }
      })
      .catch(error => {
        console.error('Error rendering mermaid diagram:', error);
        setError('Error rendering diagram. Please check your syntax.');
      });
  }, [diagramContent, isPanelReady, avoidDiagramSvgPanZoom]);

  return (
    <div 
      ref={diagramRef}
      className="w-full h-full flex items-center justify-center"
    >
      {error && (
        <div className="text-grey p-4 border border-red-300 rounded bg-red-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default DiagramDisplay; 