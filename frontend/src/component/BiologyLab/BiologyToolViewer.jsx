import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const toolMap = {
  'plant-hormone': 'https://dashing-alfajores-9ef5ad.netlify.app/',
  'mendelian-genetics': 'https://thriving-llama-918a4d.netlify.app/',
  'hibiscus-dissection': 'https://resilient-pixie-1e4455.netlify.app/','human-organ-viewer': 'https://inquisitive-creponne-319265.netlify.app/',
  'cell-division': 'https://eloquent-pithivier-95723f.netlify.app/',
  'human-circulation': 'https://benevolent-queijadas-879a72.netlify.app/',
};

const BiologyToolViewer = () => {
  const { toolId } = useParams();
  const toolUrl = toolMap[toolId];
  const [iframeError, setIframeError] = useState(false);

  if (!toolUrl) return <div>Tool not found</div>;

  return (
    <div style={{ height: '100vh' }}>
      {!iframeError ? (
        <iframe
          src={toolUrl}
          title={toolId}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          onError={() => setIframeError(true)}
        />
      ) : (
        <div style={{ padding: 20 }}>
          <p>
            Unable to load the tool in an iframe. You can{' '}
            <a href={toolUrl} target="_blank" rel="noopener noreferrer">
              open it in a new tab here
            </a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default BiologyToolViewer;
