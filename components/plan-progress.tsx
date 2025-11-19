"use client";

import { PlanStep } from "@/types/chat";
import { Check, Loader2 } from "lucide-react";

interface PlanProgressProps {
  steps: PlanStep[];
}

export default function PlanProgress({ steps }: PlanProgressProps) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center space-x-3 text-sm">
          <div className="flex-shrink-0">
            {step.status === "completed" ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            ) : step.status === "active" ? (
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                <Loader2 className="w-3 h-3 text-white animate-spin" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-300" />
            )}
          </div>
          <span className={`transition-colors duration-200 ${
            step.status === "completed" 
              ? "text-green-600" 
              : step.status === "active" 
                ? "text-blue-600 font-medium" 
                : "text-gray-500"
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
