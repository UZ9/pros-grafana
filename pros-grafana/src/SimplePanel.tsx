import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, ThemeContext, useTheme } from '@grafana/ui';
import { Marker } from "marker";

interface Props extends PanelProps<SimpleOptions> { }

const dataS = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1]
];

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  // Handle resizing the panel
  const size = width / 6;

  const heading = 0;

  const radianHeading = (heading - 90) * Math.PI / 180.0;

  const xOffset = Math.cos(radianHeading) * (30 + width / 30);
  const yOffset = Math.sin(radianHeading) * (30 + width / 30);

  return (
    <div>
      <div style={{ position: "relative", overflow: 'auto', width: width, height: height }}>



        <table style={{ border: "2px solid #35393c", overflow: 'clip' }}>
          {
            dataS.map((row, index) => (
              <tr key={row[0]}>
                {row.map(cellId => <th style={{ border: "2px solid #35393c", textAlign: 'center', width: size, height: size, padding: "5", backgroundColor: "#0f1015" }} key={cellId}></th>)}
              </tr>
            ))
          }
        </table>

        {/* style={{
        height: dotRadius * 2,
        width: dotRadius * 2,
        backgroundImage: `url(${marker})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: "absolute",
        borderRadius: dotRadius,
        // transform: `translate(${-dotRadius}, ${-dotRadius})`,
        top: y - (dotRadius) - 2,
        left: x - (dotRadius) - 2
      }} */}

        

        <div style={{position: "absolute", top: width / 6.0 - 200, left: width / 6.0 - 200}}>
          <svg width={400} height={400}>
            <defs>
              <marker id="markerArrow1" fill={theme.palette.red} stroke={theme.palette.red} markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                <path d="M2,2 L2,11 L10,6 L2,2" />
              </marker>
            </defs>
            <line x1="200" y1="200" x2={200 + xOffset * (width / 500)} y2={200 + yOffset * (width / 500)} style={{ stroke: theme.palette.red, markerEnd: "url(#markerArrow1)" }} />

          </svg>
        </div>

        <Marker x={width / 6.0} y={width / 6.0} dotRadius={width / 30} />

      </div>

    </div>

  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
