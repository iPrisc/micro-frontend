import React, { Suspense, lazy } from 'react';
import './App.css';

const Header = lazy(() => import('mfeHeader/./Navbar'));
const Lobby = lazy(() => import('mfeLobby/./Lobby'));
const Catalog = lazy(() => import('mfeCatalog/./Catalog'));
const Cart = lazy(() => import('mfeCart/./Cart'));

function LoadingFallback({ name }) {
  return (
    <div className="loading-fallback">
      Chargement {name}...
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          ⚠️ {this.props.name} indisponible
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="shell">
      <ErrorBoundary name="Header">
        <Suspense fallback={<LoadingFallback name="Header" />}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <main className="shell-content">
        <div className="content-grid-3">
          <section className="section">
            <ErrorBoundary name="Lobby">
              <Suspense fallback={<LoadingFallback name="Lobby" />}>
                <Lobby />
              </Suspense>
            </ErrorBoundary>
          </section>

          <section className="section">
            <ErrorBoundary name="Catalog">
              <Suspense fallback={<LoadingFallback name="Catalog" />}>
                <Catalog />
              </Suspense>
            </ErrorBoundary>
          </section>

          <section className="section">
            <ErrorBoundary name="Cart">
              <Suspense fallback={<LoadingFallback name="Cart" />}>
                <Cart />
              </Suspense>
            </ErrorBoundary>
          </section>
        </div>
      </main>

      <footer className="shell-footer">
        <p>Shell (3000) | Header (3001) | Lobby (3002) | Catalog (3003) | Cart (3004)</p>
      </footer>
    </div>
  );
}

export default App;
