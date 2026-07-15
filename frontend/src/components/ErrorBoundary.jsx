import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <span className="eyebrow">Something went wrong</span>
            <h1 className="font-serif" style={{ marginBottom: 12 }}>
              We hit a snag
            </h1>
            <p style={{ color: 'rgba(42, 24, 16, 0.6)', marginBottom: 24 }}>
              Sorry about that. Try reloading the page — if it keeps happening, let us know.
            </p>
            <button className="btn btn-primary" onClick={this.handleReload}>
              Back to home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}