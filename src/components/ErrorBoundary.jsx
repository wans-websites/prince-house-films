// src/components/ErrorBoundary.jsx
// Renders the CMS-configured fallbackText when provided; falls back to
// a sensible default. ErrorBoundary must remain a class component to
// use React's getDerivedStateFromError / componentDidCatch lifecycle.

import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    // eslint-disable-next-line no-console
    console.error("MediaEmbed boundary:", err, info);
  }

  render() {
    const fallbackText =
      this.props.fallbackText || "Couldn't load this media. Try another item.";

    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
          {fallbackText}
        </div>
      );
    }
    return this.props.children;
  }
}
