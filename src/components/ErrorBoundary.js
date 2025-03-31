import { Component } from "react";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        this.props.onError(true); // Notify parent about error
    }
    render() {
        return this.state.hasError ? null : this.props.children;
    }
}
export default ErrorBoundary;
