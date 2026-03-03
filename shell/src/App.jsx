import React, { Suspense, lazy } from 'react';
import './App.css';

// TODO: Importer le Header depuis le MFE distant
// Utiliser React.lazy() avec un import dynamique
// Format: const Header = lazy(() => import('nomRemote/./NomModule'));
const Header = lazy(() => import('mfeHeader/./Navbar'));

// Fallback pendant le chargement
function HeaderFallback() {
  return (
    <div className="header-loading">
      Chargement du Header...
    </div>
  );
}

function App() {
  return (
    <div className="shell">
      {/* Le Header est charge depuis le MFE distant */}
      <Suspense fallback={<HeaderFallback />}>
        <Header notifications={3} />
      </Suspense>

      <main className="shell-content">
        <div className="placeholder">
          <h2>Shell Operationnel</h2>
          <p>Le Header ci-dessus est un Micro-Frontend distant !</p>
          <p>Il est charge depuis <code>http://localhost:3001</code></p>
        </div>
      </main>

      <footer className="shell-footer">
        <p>Shell sur le port 3000 | Header MFE sur le port 3001</p>
      </footer>
    </div>
  );
}

export default App;
