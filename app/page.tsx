"use client";

import Steps from "@/components/steps";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="flex items-center justify-center h-screen">
      <button
        onClick={() => setOpen(true)}
        className="p-4 m-4 text-white bg-blue-500 rounded-lg"
      >
        Open Modal
      </button>
      <Steps
        open={open}
        setOpen={setOpen}
        steps={[
          <div>This is Step 1</div>,
          <div>This is Step 2</div>,
          <div>This is Step 3</div>,
          <div>This is Step 4</div>,
        ]}
      >
        <h1 className="text-2xl font-semibold mb-3">Complete registration</h1>
      </Steps>
    </main>
  );
}
