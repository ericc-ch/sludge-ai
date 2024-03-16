import { CSSProperties } from "react";

export function withDefaultValue(
  currentStyle: CSSProperties | undefined,
  defaultValues: CSSProperties
): CSSProperties {
  const mergedStyle = { ...currentStyle };

  for (const key in defaultValues) {
    if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
      // CSS Properties keys are not strings
      // @ts-expect-error CSS Properties keys are too big, we can't assign it directly
      mergedStyle[key] ??= defaultValues[key];
    }
  }

  return mergedStyle;
}
