import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { OdometryPanel } from './OdometryPanel';

export const plugin = new PanelPlugin<SimpleOptions>(OdometryPanel);