import React from "react";
import marker from "img/marker.jpg";
import { getTheme } from "@grafana/ui";

type MarkerProps = {
    x: number,
    y: number, 
    dotRadius: number
}

export const Marker: React.FC<MarkerProps> = ({ x, y, dotRadius }) => {
  return (
    <div
      className="marker"
      style={{
        height: dotRadius * 2,
        width: dotRadius * 2,
        backgroundColor: getTheme().palette.red,
        position: "absolute",
        borderRadius: dotRadius,
        // transform: `translate(${-dotRadius}, ${-dotRadius})`,
        top: y - (dotRadius),
        left: x - (dotRadius)
      }}
    />
  );
}
