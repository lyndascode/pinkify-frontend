import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./Context/auth.context.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <SearchProvider> {/* 2. Wrap App with SearchProvider */}
          <App />
        </SearchProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);