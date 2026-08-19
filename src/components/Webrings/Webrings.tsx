import React from "react";

interface WebringsProp {
  children: React.ReactNode;
}

export function Webrings({ children }: WebringsProp) {
  return <>{React.Children.map(children, (v) => v)}</>;
}
