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

export type SpacerOption = {
  spacer: string;
  cutToMut: number | null;
  quality: number | null;
};

export type FinalPegRNAAnnotation = {
  start: number;
  end: number;
  color: string;
  name: string;
  direction: number;
  sequence: string;
};

export type FinalPegRNA = {
  sequence: string;
  annotations: FinalPegRNAAnnotation[];
};

export type GlobalState = {
  wtSeq: string;
  mut: string;
  spacer: string;
  customSpacer: string;
  pam: string;
  minPbs: number;
  maxPbs: number;
  minRt: number;
  maxRt: number;
  spacerOptions: SpacerOption[];
  selectedSpacerOption: SpacerOption | null;
  templateOptions: TemplateOption[];
  selectedTemplateOption: string | null;
  pbsOptions: PBSOption[];
  selectedPbsOption: string | null;
  pe3Options: PE3Option[];
  selectedPe3Option: PE3Option | null;
  cleanWtSeq: string;
  cleanMutSeq: string;
  step: number;
  pegRNA: FinalPegRNA | null;
  pe3sgRNA: {
    sense: string;
    antisense: string;
  };
  warnings: {
    general: string[];
    pegRna: string[];
    pe3: string[];
  };
  spacerError: boolean;
  step2Loading: boolean;
  step3Loading: boolean;
  step4Loading: boolean;
  step5Loading: boolean;
  cloningStrategy: string;
};
