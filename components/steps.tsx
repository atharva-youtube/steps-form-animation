"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Variants, animate, motion, useAnimationControls } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";

type Props = {
  children?: ReactNode;
  steps: ReactNode[];
};

export default function Steps({ children, steps }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const prevButtonAnimControls = useAnimationControls();
  const contButtonAnimControls = useAnimationControls();
  const progressBarAnimControls = useAnimationControls();

  const prevButtonVariants = {
    animate: {
      x: 0,
      opacity: 1,
    },
    initial: {
      x: "-100%",
      opacity: 0,
    },
  };

  const progressBarVariants = {
    initial: { width: `${100 / steps.length}%` },
    animate: (step: number) => ({
      width: `${((step + 1) / steps.length) * 100}%`,
    }),
  };

  useEffect(() => {
    progressBarAnimControls.start("animate");
  }, [currentStep, progressBarAnimControls, steps.length]);

  useEffect(() => {
    if (currentStep === 1) {
      prevButtonAnimControls.start("animate");
    }
  }, [currentStep, prevButtonAnimControls, contButtonAnimControls]);

  return (
    <div className="z-10 bg-white p-11 rounded-2xl text-black text-lg max-w-md w-full">
      {children}
      {steps[currentStep]}

      <div className="flex justify-center gap-5 mt-5">
        <div className="relative flex py-1">
          <motion.div
            className="absolute rounded-full top-0 left-0 h-full bg-green-500"
            variants={progressBarVariants}
            initial="initial"
            animate={progressBarAnimControls}
            custom={currentStep}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              duration: 0.3,
            }}
          />
          {steps.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full mx-1 z-10 ${
                index <= currentStep ? "bg-white" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-7 overflow-hidden text-base">
        {currentStep > 0 && (
          <motion.button
            animate={prevButtonAnimControls}
            initial="initial"
            variants={prevButtonVariants}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
            className="px-5 py-3 text-black transition-colors bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            Back
          </motion.button>
        )}

        <motion.button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length - 1}
          className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-full flex-grow"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.3,
          }}
          layout
        >
          {currentStep === steps.length - 1 ? (
            <>
              <FaCircleCheck /> Finish
            </>
          ) : (
            "Continue"
          )}
        </motion.button>
      </div>
    </div>
  );
}
