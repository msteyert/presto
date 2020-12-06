import React from 'react';
import Copy from '../../components/Copy';
import { usePegRNA } from '../../hooks';

const PegRNA = () => {
  const { pegRNA } = usePegRNA();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        Final pegRNA:
        <Copy value={pegRNA} />
      </div>
      <p style={{ wordBreak: 'break-word' }}>{pegRNA}</p>
    </div>
  );
};

export default PegRNA;
