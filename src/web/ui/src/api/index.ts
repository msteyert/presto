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
