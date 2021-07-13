import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { OdometryPanel } from './OdometryPanel';

export const plugin = new PanelPlugin<SimpleOptions>(OdometryPanel).setPanelOptions(builder => {
    return builder 
        .addTextInput({
            path: "robotXName",
            name: "Robot X Variable Name",
            description: "The variable registered in the program giving the current x position of the robot.",
            defaultValue: "Robot X"
        })
        .addTextInput({
            path: "robotYName",
            name: "Robot Y Variable Name",
            description: "The variable registered in the program giving the current y position of the robot.",
            defaultValue: "Robot Y"
        })
        .addTextInput({
            path: "robotHeadingName",
            name: "Robot Heading Variable Name",
            description: "The variable registered in the program giving the current rotation of the robot.",
            defaultValue: "Robot Heading"
        });
});