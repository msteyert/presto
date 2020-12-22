import React from 'react';

type Props = {
  label: string;
  value: string | number | boolean;
};

const renderValue = (value: string | number | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  }
  return value;
};

const Statistic = ({ label, value }: Props) => (
  // <div
  //   style={{
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     margin: 10,
  //     width: 50,
  //   }}
  // >
  //   <h4 style={{ marginBottom: 0 }}>{label}</h4>
  //   <p>{value}</p>
  // </div>
  <p style={{ margin: 0 }}>
    <b>{`${label}: `}</b>
    {renderValue(value)}
  </p>
);

export default Statistic;
