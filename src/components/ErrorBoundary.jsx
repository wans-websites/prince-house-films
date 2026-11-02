// src/components/ErrorBoundary.jsx

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
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
          Couldn't load this media. Try another item.
        </div>
      );
    }
    return this.props.children;
  }
}
