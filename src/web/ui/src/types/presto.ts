export type TemplateOption = {
  flapLength: number;
  rt: string;
  isDefault: boolean;
  flapGC: number;
  rtTM: number;
  startsWithC: boolean;
  rtPolyT: boolean;
};

export type PBSOption = {
  length: number;
  pbs: string;
  isDefault: boolean;
  pbsGC: number;
  pbsTM: number;
  pbsPolyT: boolean;
};

export type PE3Option = {
  pamStart: number;
  cutPE3: number;
  cutDiff: number;
  secondGuide: string;
  rcSecondGuide: string;
  type: string;
};

export type GlobalState = {
  spacer: string;
  templateOptions: TemplateOption[];
  selectedTemplateOption: string | null;
  pbsOptions: PBSOption[];
  selectedPbsOption: string | null;
  pe3bOptions: PE3Option[];
  pe3Options: PE3Option[];
  selectedPe3Option: string | null;
  cleanWtSeq: string;
  cleanMutSeq: string;
  step: number;
  pegRNA: string;
  sgRNA: string;
};
