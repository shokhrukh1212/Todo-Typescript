import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundaryComponent from "./components/ErrorBoundary";
import LoaderComponent from "./components/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundaryComponent>
      <Suspense fallback={<LoaderComponent />}>
        <App />
      </Suspense>
    </ErrorBoundaryComponent>
  </React.StrictMode>
);
