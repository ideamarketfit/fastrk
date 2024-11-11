import { useEffect } from 'react';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';

interface DiagramDisplayProps {
  diagramContent: string;
  isPanelReady?: boolean;
}

const DiagramDisplay = ({
  diagramContent,
  isPanelReady = true
}: DiagramDisplayProps) => {
  useEffect(() => {
    if (!isPanelReady || !diagramContent) return;

    const element = document.getElementById('mermaid-diagram');
    if (element) {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontSize: 16,
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true
        }
      });
      
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
                zoomScaleSensitivity: 0.2,
              });

              setTimeout(() => {
                // panZoom.zoom(0.7);
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

  return (
    <div 
      id="mermaid-diagram" 
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: '400px' }}
    />
  );
};

export default DiagramDisplay; 