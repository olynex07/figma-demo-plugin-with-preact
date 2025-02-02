import { EventHandler } from '@create-figma-plugin/utilities';

export interface ShowIconInEditorHandler extends EventHandler {
  name: 'SHOW_ICON_IN_EDITOR';
  handler: (iconUrl: string) => void;
}

export interface Icon {
  _id: string;
  icon: string;
  type:string
}
