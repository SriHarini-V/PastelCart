import { Component } from "react";

// ErrorBoundary: class component (required — error boundaries can't be
// hooks) that catches render/runtime errors anywhere below it in the tree
// and shows a friendly fallback page instead of a blank white screen.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-page">
          <h2>😕 Something went wrong</h2>
          <p>
            Sorry about that — an unexpected error occurred while loading this
            page.
          </p>
          <button className="btn btn-primary" onClick={this.handleReset}>
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
