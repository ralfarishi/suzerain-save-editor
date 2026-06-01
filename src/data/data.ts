export type {
	FieldType,
	BaseField,
	NumberField,
	CheckboxField,
	RadioOption,
	RadioGroupField,
	BooleanDateField,
	GameField,
	Section,
	TabData,
} from "./types";

import type { TabData } from "./types";
import { sordlandData } from "./sordland";
import { riziaData } from "./rizia";

export const appData: TabData[] = [
	...sordlandData,
	...riziaData,
];
