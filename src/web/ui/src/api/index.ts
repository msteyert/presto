import { API_ROOT, MIXPANEL_KEY } from '../config';
import { SpacerOption } from '../types/presto';
import mixpanel from 'mixpanel-browser';
import { getGlobalState } from '../hooks';
mixpanel.init(MIXPANEL_KEY);

export const generateTemplateOptions = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/rt`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generatePrimerBindingSiteOptions = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/pbs`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generatePe3Options = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/pe3`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generateMutSeq = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/mutSeq`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generateCleanWtSeq = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/cleanWtSeq`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generatePegRNA = async (
  spacer: string,
  rtt: string,
  pbs: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/pegrna`, {
    method: 'post',
    body: JSON.stringify({ spacer, rtt, pbs }),
  });
  return await res.json();
};

export const generateSgRNA = async (pe3: string) => {
  const res = await fetch(`${API_ROOT}/generate/sgrna`, {
    method: 'post',
    body: JSON.stringify({ pe3 }),
  });
  return await res.json();
};

export const generateSpacerSgRNA = async (spacer: string) => {
  const res = await fetch(`${API_ROOT}/generate/spacer_sgrna`, {
    method: 'post',
    body: JSON.stringify({ spacer, wtSeq: '', mut: '' }),
  });
  return await res.json();
};

export const generateSpacers = async (
  wtSeq: string,
  mut: string,
  pam: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/spacers`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer: '',
      pam,
    }),
  });
  const spacerOptions: SpacerOption[] = await res.json();
  return spacerOptions;
};

export const generateWarnings = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/warnings`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  return await res.json();
};

export const generateCSV = async (
  wtSeq: string,
  mut: string,
  spacer: string,
  pam: string,
  minPbs: number,
  maxPbs: number,
  minRt: number,
  maxRt: number,
) => {
  const res = await fetch(`${API_ROOT}/generate/csv`, {
    method: 'post',
    body: JSON.stringify({
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    }),
  });
  const responseText = await res.text();
  const url = window.URL.createObjectURL(new Blob([responseText]));
  const link = document.createElement('a');
  link.id = 'download';
  link.href = url;
  link.setAttribute('download', res.headers.get('FileName') || 'presto.csv');
  document.body.appendChild(link);
  link.click();

  const elem = document.querySelector('#download');

  if (elem && elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
};

export const trackEvent = (event: string) => {
  mixpanel.track(event, {
    wtSeq: getGlobalState('wtSeq'),
    mut: getGlobalState('mut'),
    spacer: getGlobalState('spacer'),
    customSpacer: getGlobalState('customSpacer'),
    pam: getGlobalState('pam'),
    minPbs: getGlobalState('minPbs'),
    maxPbs: getGlobalState('maxPbs'),
    minRt: getGlobalState('minRt'),
    maxRt: getGlobalState('maxRt'),
    selectedTemplateOption: getGlobalState('selectedTemplateOption')?.rt,
    selectedSpacerOption: getGlobalState('selectedSpacerOption')?.spacer,
    selectedPbsOption: getGlobalState('selectedPbsOption')?.pbs,
    selectedPe3Option: getGlobalState('selectedPe3Option')?.secondGuide,
    selectedPe3OptionType: getGlobalState('selectedPe3Option')?.type,
    cleanWtSeq: getGlobalState('cleanWtSeq'),
    cleanMutSeq: getGlobalState('cleanMutSeq'),
    pegRNA: getGlobalState('pegRNA')?.sequence,
    pe3sgRNASense: getGlobalState('pe3sgRNA')?.sense,
    pe3sgRNAAntiSense: getGlobalState('pe3sgRNA')?.antisense,
  });
};
