export type TemplateOption = {
  rt: string;
};

export type PBSOption = {
  pbs: string;
};

export type GlobalState = {
  templateOptions: TemplateOption[];
  pbsOptions: PBSOption[];
  cleanWtSeq: string;
  cleanMutSeq: string;
  step: number;
};
