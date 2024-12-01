import React from 'react';

const ModalEventCreation = ( { children, onClose }: { children: React.ReactNode, onClose: () => void } ) =>
{
  return (
    <div style={ styles.overlay }>
      <div style={ styles.modal }>
        <button onClick={ onClose } style={ styles.closeButton }>X</button>
        { children }
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default ModalEventCreation;