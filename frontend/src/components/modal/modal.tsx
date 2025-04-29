import { JSX } from 'react';
import Button from '../button/button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './modal.css';

interface ModalProps {
  title?: string;
  message: string;
  primaryButton: {
    text: string;
    variant: 'save' | 'delete';
    onClick: () => void;
  };
  secondaryButton: {
    text: string;
    variant: 'save-transparent' | 'delete-transparent';
    onClick: () => void;
  };
  onClose: () => void; // Остается обязательным
}

export default function Modal({
  title,
  message,
  primaryButton,
  secondaryButton,
  onClose,
}: ModalProps): JSX.Element {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Показываем header только если есть title */}
        {(title) && (
          <div className="modal__header">
            {title && <h3 className="modal__title">{title}</h3>}
            <IconButton size="small" className="close-button" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <Button
            variant={primaryButton.variant}
            text={primaryButton.text}
            onClick={primaryButton.onClick}
          />
          <Button
            variant={secondaryButton.variant}
            text={secondaryButton.text}
            onClick={secondaryButton.onClick}
          />
        </div>
      </div>
    </div>
  );
}