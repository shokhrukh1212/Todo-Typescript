import { Component, ErrorInfo } from "react";
import { ErrorState, Props } from "../../types/common";

class ErrorBoundaryComponent extends Component<Props, ErrorState> {
  public state: ErrorState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryComponent;