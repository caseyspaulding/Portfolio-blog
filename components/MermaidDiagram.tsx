import { useEffect } from "react";
import mermaid from "mermaid";


interface MermaidProps
{
  diagramCode: string;
  title?: string;
}
const MermaidDiagram: React.FC<MermaidProps> = ( { diagramCode, title } ) =>
{
  useEffect( () =>
  {
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'system-ui',
      }
    } );
    mermaid.contentLoaded();
  }, [] );

  return (
    <div className="my-8">
      { title && (
        <h3 className="text-lg font-semibold mb-4">{ title }</h3>
      ) }
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mermaid">
          { diagramCode }
        </div>
      </div>
    </div>
  );
};

export default MermaidDiagram;