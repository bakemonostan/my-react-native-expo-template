/**
 * Example usage of ErrorBoundary component
 *
 * This file demonstrates how to use the project-agnostic ErrorBoundary
 * in your React Native application.
 */

import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

// Example 1: Basic usage wrapping your entire app
export function AppWithErrorBoundary() {
  return (
    <ErrorBoundary catchErrors="always">
      <YourApp />
    </ErrorBoundary>
  );
}

// Example 2: Only catch errors in production
export function AppWithProductionErrorBoundary() {
  return (
    <ErrorBoundary catchErrors="prod">
      <YourApp />
    </ErrorBoundary>
  );
}

// Example 3: Only catch errors in development
export function AppWithDevErrorBoundary() {
  return (
    <ErrorBoundary catchErrors="dev">
      <YourApp />
    </ErrorBoundary>
  );
}

// Example 4: Wrap specific sections
export function FeatureWithErrorBoundary() {
  return (
    <ErrorBoundary catchErrors="always">
      <ComplexFeature />
    </ErrorBoundary>
  );
}

// Mock components for examples
function YourApp() {
  return null;
}

function ComplexFeature() {
  return null;
}
