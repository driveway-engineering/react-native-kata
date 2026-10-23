import {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  ReduceMotion,
  ZoomIn,
} from "react-native-reanimated";

// Shared motion presets so timing feels consistent and can be tuned in one place.
// Every preset honours the OS "Reduce Motion" accessibility setting.

export const durations = {
  fast: 150,
  normal: 250,
  slow: 400,
};

const STAGGER_MS = 70;
const easeOut = Easing.out(Easing.cubic);

export const pressScale = 0.97;

export const animations = {
  fadeIn: FadeIn.duration(durations.normal).reduceMotion(ReduceMotion.System),
  fadeOut: FadeOut.duration(durations.fast).reduceMotion(ReduceMotion.System),
  /** Content sliding up into place, optionally staggered by position. */
  enterUp: (index = 0) =>
    FadeInDown.duration(durations.slow)
      .delay(index * STAGGER_MS)
      .easing(easeOut)
      .reduceMotion(ReduceMotion.System),
  /** Smoothly moves siblings when an item grows, shrinks or appears. */
  layout: LinearTransition.duration(durations.normal)
    .easing(easeOut)
    .reduceMotion(ReduceMotion.System),
  /** Celebratory pop for success feedback. */
  pop: ZoomIn.springify().damping(12).stiffness(180).reduceMotion(ReduceMotion.System),
  /** Radio dot appearing. */
  scaleIn: ZoomIn.duration(durations.fast).reduceMotion(ReduceMotion.System),
};
