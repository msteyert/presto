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
  templateOptions: TemplateOption[];
  pbsOptions: PBSOption[];
  pe3bOptions: PE3Option[];
  pe3Options: PE3Option[];
  cleanWtSeq: string;
  cleanMutSeq: string;
  step: number;
};
