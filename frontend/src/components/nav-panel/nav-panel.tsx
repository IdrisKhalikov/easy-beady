import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Modal from '../../components/modal/modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestartIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import './nav-panel.css';

type NavigationPanelProps = {
  title: string;
  selectedOption: 'edit' | 'weave';
  onOptionChange: (option: 'edit' | 'weave') => void;
  onSave: () => void;
  onRestart: () => void;
};

export default function NavigationPanel({
  title,
  selectedOption,
  onOptionChange,
  onSave,
  onRestart
}: NavigationPanelProps): JSX.Element {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleDeleteButton = () => {
    console.log('Удалено');
    setShowDeleteModal(false);
    navigate(AppRoute.Root);
  };

  const handleSaveButton = () => {
    console.log('Сохранено');
    onSave();
    setShowSaveModal(false);
  };

  const handleRestartButton = () => {
    onRestart();
    setShowRestartModal(false);
  };

  return (
    <>
      <div className='heading'>
        <h2>{title}</h2>
      </div>
      <div className="nav-panel">
        <div className="mode-toggle">
          <button
            className={`mode-toggle__button ${selectedOption === 'edit' ? 'active' : ''}`}
            onClick={() => onOptionChange('edit')}
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            className={`mode-toggle__button ${selectedOption === 'weave' ? 'active' : ''}`}
            onClick={() => onOptionChange('weave')}
          >
            <Grid4x4Icon fontSize="small" />
          </button>
        </div>
        <div className="save-exit-actions">
          <IconButton size="medium" className="restart-button" onClick={() => setShowRestartModal(true)}>
            <RestartIcon fontSize="medium" />
          </IconButton>
          <IconButton size="medium" className="save-button" onClick={() => setShowSaveModal(true)}>
            <SaveIcon fontSize="medium" />
          </IconButton>
          <IconButton size="medium" className="close-button" onClick={() => setShowDeleteModal(true)}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          message="Вы уверены, что не забыли сохранить схему перед закрытием?"
          primaryButton={{
            text: 'Закрыть',
            variant: 'delete',
            onClick: handleDeleteButton,
          }}
          secondaryButton={{
            text: 'Отмена',
            variant: 'delete-transparent',
            onClick: () => setShowDeleteModal(false),
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showSaveModal && (
        <Modal
          title="Сохранение схемы"
          message="Сохранить текущую схему?"
          primaryButton={{
            text: 'Сохранить',
            variant: 'save',
            onClick: handleSaveButton,
          }}
          secondaryButton={{
            text: 'Отмена',
            variant: 'save-transparent',
            onClick: () => setShowSaveModal(false),
          }}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {showRestartModal && (
        <Modal
          title="Сброс схемы"
          message="Вы уверены, что хотите сбросить схему?"
          primaryButton={{
            text: 'Сбросить',
            variant: 'delete',
            onClick: handleRestartButton,
          }}
          secondaryButton={{
            text: 'Отмена',
            variant: 'delete-transparent',
            onClick: () => setShowRestartModal(false),
          }}
          onClose={() => setShowRestartModal(false)}
        />
      )}
    </>
  );
}