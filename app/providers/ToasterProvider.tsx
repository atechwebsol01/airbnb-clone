"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#1A1A1D",
          color: "#F2F0EB",
          border: "1px solid #333336",
        },
      }}
    />
  );
};

export default ToasterProvider;
