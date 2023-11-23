import { Routes, Route } from "react-router-dom"

import { CoreRoot } from "./core/core-root";
import { RootLayout } from "./shared/layout";

function AppRoot() {
  return (
    <RootLayout forRoot={true}>
      <Routes>
        <Route path="/" element={<CoreRoot />} />
      </Routes>
    </RootLayout>
  );
} 

export default AppRoot;
