import { HTMLProps } from "react";
import { withDefaultValue } from "../lib/styles";

export const Text = (props: HTMLProps<HTMLDivElement>) => {
  const styleWithDefaults = withDefaultValue(props.style, {
    fontFamily: "DynaPuff Variable",
    color: "white",
  });

  return <div {...props} style={styleWithDefaults} />;
};
