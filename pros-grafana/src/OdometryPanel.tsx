import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { useTheme } from '@grafana/ui';
import { Marker } from "marker";

interface Props extends PanelProps<SimpleOptions> { }

// To quickly create a table grid, we can just use a 2D array of numbers
const dataS = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

function translatePosToGui(x: number, y: number, currentWidth: number): [number, number] {
  const scale = currentWidth / 6.0;

  return [x * scale, y * scale];
}

export const OdometryPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  // Handle resizing the panel
  const size = width / 6;

  const dataVals = data.series[0].fields;

  // I'm sure there's a better way of doing this, but I don't know enough of grafana to think of a good solution
  const dataRobotXField = dataVals.find(f => f?.name == "robotx");
  const dataRobotYField = dataVals.find(f => f?.name == "roboty");
  const dataRobotHeadingField = dataVals.find(f => f?.name == "robotheading");

  let dataRobotX = dataRobotXField?.values.get(dataRobotXField.values.length - 1);
  let dataRobotY = dataRobotYField?.values.get(dataRobotYField.values.length - 1);
  let dataRobotHeading = dataRobotHeadingField?.values.get(dataRobotHeadingField.values.length - 1);

  // If the data is invalid or it can't find the given variables, set the default values
  if (isNaN(dataRobotY)) {
    return (
      <div style={{ position: "relative", overflow: 'clip', width: width, height: height}}>
        <div style={{ textAlign:"center", display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column", width, height }}>
          <ul>
            <li>
              <p>
                No odometry data was found.
              </p>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  // Heading calculations
  const radianHeading = (dataRobotHeading - 90) * Math.PI / 180.0;

  const xOffset = Math.cos(radianHeading) * (30 + width / 30);
  const yOffset = Math.sin(radianHeading) * (30 + width / 30);


  const [robotX, robotY] = translatePosToGui(dataRobotX, dataRobotY, width);

  return (
    <div>
      <div style={{ position: "relative", overflow: 'clip', width: width, height: height }}>
        <table style={{ border: "1px solid #35393c", overflow: 'clip' }}>
          {
            dataS.map((row) => (
              <tr key={row[0]}>
                {row.map(cellId => <th style={{ border: "1px solid #35393c", textAlign: 'center', width: size, height: size, padding: "5" }} key={cellId}></th>)}
              </tr>
            ))
          }
        </table>

        <div style={{ position: "absolute", top: robotY - 200, left: robotX - 200 }}>
          <svg width={width} height={height}>
            <defs>
              <marker id="markerArrow1" fill={theme.palette.red} stroke={theme.palette.red} markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                <path d="M2,2 L2,11 L10,6 L2,2" />
              </marker>
            </defs>
            <line x1="200" y1="200" x2={200 + xOffset * (width / 500)} y2={200 + yOffset * (width / 500)} style={{ stroke: theme.palette.red, markerEnd: "url(#markerArrow1)" }} />

          </svg>
        </div>

        <Marker x={robotX} y={robotY} dotRadius={width / 30} />

      </div>
    </div>

  );
};