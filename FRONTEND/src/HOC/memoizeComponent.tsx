import React, { FunctionComponent } from "react";

// Higher Order Component for memoization with dependencies
const withMemoization = (Component: FunctionComponent, dependencies?: any) => {
  return React.memo(Component, dependencies);
};

export default withMemoization;
