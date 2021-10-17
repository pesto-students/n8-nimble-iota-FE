import React from "react";
import Servererror from "src/components/Page/Error/Servererror";

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
            return <Servererror />;
        }

        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}
export default ErrorBoundary;
