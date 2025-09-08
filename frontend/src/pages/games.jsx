import React from 'react';

const Games = () => {
  return (
    <>
      <div className="games-container">
        <iframe
          src="https://deluxe-cendol-4a63c0.netlify.app"
          title="Games Portal"
          className="games-iframe"
        ></iframe>
      </div>

      <style jsx="true">{`
        .games-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .games-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </>
  );
};

export default Games;
