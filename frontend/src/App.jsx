// src/App.jsx
import 'preline'; // Import to ensure JS behaviors work
import React from 'react';

function App() {
  return (
    <div className="p-10">
      <button
        type="button"
        className="btn btn-primary"
        data-hs-overlay="#my-modal"
      >
        Open Modal
      </button>

      {/* Example of a modal */}
      <div
        id="my-modal"
        className="hs-overlay hidden w-full h-full fixed inset-0 bg-black/50"
      >
        <div className="hs-overlay-content p-4 bg-white rounded shadow-lg">
          <h3>Welcome to Preline + Vite!</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
