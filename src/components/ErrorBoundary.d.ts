import React, { Component, ReactNode } from "react";
interface ErrorBoundaryProps {
    children: ReactNode;
    onError: (hasError: boolean) => void;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
export default ErrorBoundary;
