export interface Column {
  name: string;
  kind: string;
  isList: boolean;
  isRequired: boolean;
  isUnique: boolean;
  isId: boolean;
  isReadOnly: boolean;
  hasDefaultValue: boolean;
  type: string;
  isGenerated: boolean;
  isUpdatedAt: boolean;
  description: string;
}
