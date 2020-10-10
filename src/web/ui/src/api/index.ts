import { API_ROOT } from '../config';

export const generateTemplateOptions = async (
  wtSeq: string,
  mut: string,
  spacer: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/rt`, {
    method: 'post',
    body: JSON.stringify({ wtSeq, mut, spacer }),
  });
  return await res.json();
};

export const generatePrimerBindingSiteOptions = async (
  wtSeq: string,
  mut: string,
  spacer: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/pbs`, {
    method: 'post',
    body: JSON.stringify({ wtSeq, mut, spacer }),
  });
  return await res.json();
};

export const generatePe3Options = async (
  wtSeq: string,
  mut: string,
  spacer: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/pe3`, {
    method: 'post',
    body: JSON.stringify({ wtSeq, mut, spacer }),
  });
  return await res.json();
};

export const generateMutSeq = async (
  wtSeq: string,
  mut: string,
  spacer: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/mutSeq`, {
    method: 'post',
    body: JSON.stringify({ wtSeq, mut, spacer }),
  });
  return await res.json();
};

export const generateCleanWtSeq = async (
  wtSeq: string,
  mut: string,
  spacer: string,
) => {
  const res = await fetch(`${API_ROOT}/generate/cleanWtSeq`, {
    method: 'post',
    body: JSON.stringify({ wtSeq, mut, spacer }),
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
