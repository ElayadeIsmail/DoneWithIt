import { ToastOptions } from 'react-hot-toast/dist/core/types';

export const toastOptions: ToastOptions = {
  // Define default options
  className: '',
  style: {
    margin: '40px',
    background: '#fff',
    color: '#000',
    zIndex: 50,
    width: 'auto',
    padding: '.7rem 1rem',
    fontSize: '1.1rem',
    fontWeight: 'lighter',
    fontFamily: 'monospace',
    borderRadius: 'inherit',
    textAlign: 'center',
  },
  duration: 4000,
};
