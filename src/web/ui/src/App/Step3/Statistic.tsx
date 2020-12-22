import React from 'react';

type Props = {
  label: string;
  value: string | number | boolean;
};

const renderValue = (value: string | number | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  }
  return value || null;
};

const Statistic = ({ label, value }: Props) => (
  <p style={{ margin: 0 }}>
    <b>{`${label}: `}</b>
    {renderValue(value)}
  </p>
);

export default Statistic;
