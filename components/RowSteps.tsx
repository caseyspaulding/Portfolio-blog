"use client";

import type { ComponentProps } from "react";
import React from "react";
import { useControlledState } from "@react-stately/utils";
import { m, LazyMotion, domAnimation } from "framer-motion";

import { cn } from "@/lib/utils"; // Changed to shadcn's utility import path

export type RowStepProps = {
  title?: React.ReactNode;
  className?: string;
};

export interface RowStepsProps extends React.HTMLAttributes<HTMLButtonElement>
{
  /**
   * An array of steps.
   *
   * @default []
   */
  steps?: RowStepProps[];
  /**
   * The color of the steps.
   *
   * @default "primary"
   */
  color?: "primary" | "secondary" | "destructive" | "default"; // Changed to match shadcn colors
  /**
   * The current step index.
   */
  currentStep?: number;
  /**
   * The default step index.
   *
   * @default 0
   */
  defaultStep?: number;
  /**
   * Whether to hide the progress bars.
   *
   * @default false
   */
  hideProgressBars?: boolean;
  /**
   * The custom class for the steps wrapper.
   */
  className?: string;
  /**
   * The custom class for the step.
   */
  stepClassName?: string;
  /**
   * Callback function when the step index changes.
   */
  onStepChange?: ( stepIndex: number ) => void;
}

function CheckIcon ( props: ComponentProps<"svg"> )
{
  return (
    <svg { ...props } fill="none" stroke="currentColor" strokeWidth={ 2 } viewBox="0 0 24 24">
      <m.path
        animate={ { pathLength: 1 } }
        d="M5 13l4 4L19 7"
        initial={ { pathLength: 0 } }
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={ {
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        } }
      />
    </svg>
  );
}

const RowSteps = React.forwardRef<HTMLButtonElement, RowStepsProps>(
  (
    {
      color = "primary",
      steps = [],
      defaultStep = 0,
      onStepChange,
      currentStep: currentStepProp,
      hideProgressBars = false,
      stepClassName,
      className,
      ...props
    },
    ref,
  ) =>
  {
    const [ currentStep, setCurrentStep ] = useControlledState(
      currentStepProp,
      defaultStep,
      onStepChange,
    );

    const colors = React.useMemo( () =>
    {
      let activeColor;
      let activeFgColor;
      let inactiveColor;
      let inactiveBarColor;

      // Mapping to shadcn color tokens
      switch ( color )
      {
        case "primary":
          activeColor = "bg-primary border-primary";
          activeFgColor = "text-primary-foreground";
          inactiveColor = "border-gray-300 text-gray-500";
          inactiveBarColor = "bg-gray-300";
          break;
        case "secondary":
          activeColor = "bg-secondary border-secondary";
          activeFgColor = "text-secondary-foreground";
          inactiveColor = "border-gray-300 text-gray-500";
          inactiveBarColor = "bg-gray-300";
          break;
        case "destructive":
          activeColor = "bg-destructive border-destructive";
          activeFgColor = "text-destructive-foreground";
          inactiveColor = "border-gray-300 text-gray-500";
          inactiveBarColor = "bg-gray-300";
          break;
        default:
          activeColor = "bg-primary border-primary";
          activeFgColor = "text-primary-foreground";
          inactiveColor = "border-gray-300 text-gray-500";
          inactiveBarColor = "bg-gray-300";
          break;
      }

      return { activeColor, activeFgColor, inactiveColor, inactiveBarColor };
    }, [ color ] );

    return (
      <nav aria-label="Progress" className="-my-4 max-w-fit overflow-x-scroll py-4">
        <ol className={ cn( "flex flex-row flex-nowrap gap-x-3", className ) }>
          { steps?.map( ( step, stepIdx ) =>
          {
            const status =
              currentStep === stepIdx ? "active" : currentStep < stepIdx ? "inactive" : "complete";

            return (
              <li key={ stepIdx } className="relative flex w-full items-center pr-12">
                <button
                  key={ stepIdx }
                  ref={ ref }
                  aria-current={ status === "active" ? "step" : undefined }
                  className={ cn(
                    "group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-full py-2.5",
                    stepClassName,
                  ) }
                  onClick={ () => setCurrentStep( stepIdx ) }
                  { ...props }
                >
                  <div className="h-full relative flex items-center">
                    <LazyMotion features={ domAnimation }>
                      <m.div animate={ status } className="relative">
                        <m.div
                          className={ cn(
                            "relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 text-lg font-semibold",
                            {
                              "shadow-lg": status === "complete",
                              [ colors.inactiveColor ]: status === "inactive",
                              [ `border-primary text-primary` ]: status === "active",
                              [ colors.activeColor ]: status === "complete",
                            },
                          ) }
                          initial={ false }
                          transition={ { duration: 0.25 } }
                        >
                          <div className="flex items-center justify-center">
                            { status === "complete" ? (
                              <CheckIcon className={ cn( "h-6 w-6", colors.activeFgColor ) } />
                            ) : (
                              <span>{ stepIdx + 1 }</span>
                            ) }
                          </div>
                        </m.div>
                      </m.div>
                    </LazyMotion>
                  </div>
                  <div className="max-w-full flex-1 text-start">
                    <div
                      className={ cn(
                        "text-sm font-medium transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-base",
                        {
                          "text-gray-500": status === "inactive",
                          "text-foreground": status !== "inactive",
                        },
                      ) }
                    >
                      { step.title }
                    </div>
                  </div>
                  { stepIdx < steps.length - 1 && !hideProgressBars && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 w-10 flex-none items-center"
                    >
                      <div
                        className={ cn(
                          "relative h-0.5 w-full transition-colors duration-300",
                          colors.inactiveBarColor,
                          "after:absolute after:block after:h-full after:w-0 after:bg-primary after:transition-[width] after:duration-300 after:content-['']",
                          {
                            "after:w-full": stepIdx < currentStep,
                          },
                        ) }
                      />
                    </div>
                  ) }
                </button>
              </li>
            );
          } ) }
        </ol>
      </nav>
    );
  },
);

RowSteps.displayName = "RowSteps";

export default RowSteps;