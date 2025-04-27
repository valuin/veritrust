import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper-primitive";

export default function VerticalStepper({
  steps,
  activeStep,
  onStepClick,
}: {
  steps: string[];
  activeStep: number;
  onStepClick?: (idx: number) => void;
}) {
  return (
    <div className="space-y-8 text-center">
      <Stepper value={activeStep} orientation="vertical">
        {steps.map((title, idx) => (
          <StepperItem
            key={idx}
            step={idx}
            className="relative text-white items-start not-last:flex-1"
          >
            <StepperTrigger
              className="items-start rounded pb-12 last:pb-0"
              onClick={onStepClick ? () => onStepClick(idx) : undefined}
              tabIndex={onStepClick ? 0 : -1}
              style={{ cursor: onStepClick ? "pointer" : "default" }}
            >
              <StepperIndicator />
              <div className="mt-0.5 space-y-0.5 px-2 text-left">
                <StepperTitle>{title}</StepperTitle>
                {/* Optionally add description here if needed */}
              </div>
            </StepperTrigger>
            {idx < steps.length - 1 && (
              <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
