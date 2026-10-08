import React from 'react';
import { RefreshCw, Coffee, AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Moon & Bean caught runtime exception:', error, errorInfo);
  }

  handleReload = () => {
    // Clear session cache and hard reload
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-moon-black text-moon-cream flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl border border-moon-gold/30 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full glass-pill border border-moon-gold/40 flex items-center justify-center mx-auto text-moon-gold">
              <Coffee size={28} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-moon-gold">
                MOON &amp; BEAN SALON
              </span>
              <h1 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-moon-cream">
                A MOMENT'S PAUSE
              </h1>
              <p className="font-sans text-xs text-moon-muted leading-relaxed">
                The tasting experience encountered a brief interruption. Please reload to resume your salon journey.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-stone-400 text-left flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 text-moon-gold mt-0.5" />
                <span className="truncate">{this.state.error.message}</span>
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 bg-moon-gold text-moon-black rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-moon-amber transition duration-300 shadow-xl shadow-moon-gold/20"
            >
              <RefreshCw size={15} />
              <span>RELOAD SALON EXPERIENCE</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
