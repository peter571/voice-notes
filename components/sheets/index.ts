import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { noteOptions } from "./note-options";

registerSheet("NOTE_OPTIONS", noteOptions);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    ["NOTE_OPTIONS"]: SheetDefinition<{
      payload: Record<string, any>;
    }>;
  }
}

export {};
