import { JSX } from 'react';
import './styles.css';

export default function Spinner(): JSX.Element {
  return (
    <div className="spinner-wrapper">
      <span className="spinner"></span>
    </div>
  );
}
