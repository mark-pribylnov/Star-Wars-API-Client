import type { Dispatch, SetStateAction } from 'react';
import type {
  CategoryUnitWithDescription,
  LoadErrorReason,
} from '../../types/base';

export type SetData = Dispatch<
  SetStateAction<CategoryUnitWithDescription[] | null>
>;
export type SetSearchTerm = Dispatch<SetStateAction<string | null>>;
export type SetBoolean = Dispatch<SetStateAction<boolean>>;
export type SetLoadError = Dispatch<SetStateAction<LoadErrorReason | null>>;
