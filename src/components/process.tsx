import clsx from "clsx";
import { useRef, useState } from "react";

export type ProcessType = {
  [key: string]: {
    status: "pending" | "working" | "success" | "error";
    child: string | React.ReactNode;
  };
};

export default function Process({ data }: { data: ProcessType }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-6">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className={clsx(
              "flex items-center justify-center bg-white p-[3px] rounded-full border",
              {
                "border-gray-500": value.status === "pending",
                "border-yellow-500": value.status === "working",
                "border-green-500": value.status === "success",
                "border-red-500": value.status === "error",
              }
            )}
          >
            <div
              className={clsx("w-4 h-4 rounded-full", {
                "bg-gray-500": value.status === "pending",
                "bg-yellow-500 animate-pulse": value.status === "working",
                "bg-green-500": value.status === "success",
                "bg-red-500": value.status === "error",
              })}
            />
          </div>

          <p className="text-lg">{value.child}</p>
        </div>
      ))}
    </div>
  );
}

export function useProcess(defaultProcess: ProcessType) {
  const currentStep = useRef<string>(Object.keys(defaultProcess)[0]);

  const [process, setProcess] = useState(defaultProcess);

  const setNextStep = () => {
    const currStepIndex = Object.keys(process).indexOf(
      currentStep.current as string
    );
    const nextStepIndex =
      currStepIndex + 1 < Object.keys(process).length
        ? currStepIndex + 1
        : currStepIndex;
    currentStep.current = Object.keys(process)[nextStepIndex];
  };

  return {
    process,
    setWorking: (child: string | React.ReactNode) => {
      setProcess((prev) => ({
        ...prev,
        [currentStep.current]: {
          status: "working",
          child,
        },
      }));
    },
    setSuccess: (child: string | React.ReactNode) => {
      const c = currentStep.current;
      setNextStep();

      setProcess((prev) => ({
        ...prev,
        [c]: {
          status: "success",
          child,
        },
      }));
    },
    setError: (child: string | React.ReactNode) => {
      setProcess((prev) => ({
        ...prev,
        [currentStep.current]: {
          status: "error",
          child,
        },
      }));
    },
    reset: () => {
      currentStep.current = Object.keys(defaultProcess)[0];
      setProcess(defaultProcess);
    },
  };
}
