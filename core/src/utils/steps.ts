import {
  HighlightType,
  ModalStep,
  ProgressType,
  Step,
  StepType,
  TooltipStep,
} from "../@types";
import { warn } from "./logger";

function validateTooltipStep(step: TooltipStep) {
  if (!step.element) {
    throw new Error('Missing property "element"');
  }

  if (!step.headerText && !step.bodyText) {
    warn(
      `The ${step.type} will not have any text because you didn't set the headerText or bodyText properties`
    );
  }
}

function validateModalStep(step: ModalStep) {
  return;
}

function validateCustomStep(step: Step) {}

export function validateStep(step: Step): void {
  switch (step.type) {
    case "TOOLTIP":
      validateTooltipStep(step as TooltipStep);

    case "MODAL":
      return validateModalStep(step as ModalStep);

    case "CUSTOM":
      return validateCustomStep(step);

    default:
      validateTooltipStep(step as TooltipStep);
  }
}

export function validateSteps(steps: Step[] = []): void {
  steps.map((step) => validateStep(step));
}

export const DEFAULT_PROGRESS_ON: ProgressType = "BUTTON";
export const DEFAULT_TYPE = "TOOLTIP";
export const DEFAULT_HIGHLIGHT_TYPE: HighlightType = "NONE";
export const DEFAULT_SHOW_ARROW: boolean = true;

function getTooltipStepWithDefaults({
  type = DEFAULT_TYPE,
  highlightType = DEFAULT_HIGHLIGHT_TYPE,
  progressOn = DEFAULT_PROGRESS_ON,
  showArrow = true,
  headerText,
  bodyText,
  element,
}: TooltipStep) {
  return {
    type,
    highlightType,
    progressOn,
    showArrow,
    headerText,
    bodyText,
    element,
  };
}

function getModalStepWithDefaults(step: ModalStep) {
  return step;
}

export function getStepWithDefaults(step: Step): Step {
  if (!step.type) step.type = DEFAULT_TYPE;

  switch (step.type) {
    case "TOOLTIP":
      return getTooltipStepWithDefaults(step);

    case "MODAL":
      return getModalStepWithDefaults(step);
    default:
      return step;
  }
}
