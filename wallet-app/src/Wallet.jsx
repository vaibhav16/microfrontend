import React from 'react';

const Wallet = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Wallet Overview</h2>
      <div style={styles.info}>
        <p><strong>Balance:</strong> 2.345 ETH</p>
        <p><strong>Address:</strong> 0x3d...fA9C</p>
        <p><strong>Status:</strong> Connected</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '300px',
  },
  heading: {
    marginBottom: '12px',
  },
  info: {
    fontSize: '14px',
    lineHeight: '1.5',
  },
};

export default Wallet;
