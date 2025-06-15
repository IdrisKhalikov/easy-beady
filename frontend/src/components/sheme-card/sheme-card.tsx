import './sheme-card.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import { CompletionStatus, SchemaPreview } from 'types/schema-preview';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface SchemeCardProps {
  schema: SchemaPreview
  onDelete: () => void;
}

export default function SchemeCard({ schema, onDelete }: SchemeCardProps) {
  const navigate = useNavigate();
  const redirectToEditPage = useCallback(
    () => navigate(`edit/${schema.schemaId}`),
    [navigate, schema]
  );

  const deleteClickHandler = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete();
  }, [onDelete]);

  const progress = schema.linesCompleted.reduce((acc, c) => (c ? acc + 1 : acc), 0) * 100 / schema.width;
  const status = progress == 100 ? CompletionStatus.Done : CompletionStatus.InProgress;

  return (
    <div className={`card card--${status == CompletionStatus.Done ? 'done' : 'in-progress'}`} onClick={redirectToEditPage}>
      <div className="card__header">
        <h3 className="card__title">{schema.name}</h3>
          <IconButton
            size="small"
            className="close-button"
            onClick={status === CompletionStatus.InProgress ? deleteClickHandler : undefined} 
            disabled={status !== CompletionStatus.InProgress}
            sx={{ padding: 0 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
      </div>

      <div className="card__image-container">
        <img
          src={`data:image/png;base64,${schema.preview}`}
          
          alt="Scheme Preview"
          className="card__image"
        />
      </div>

      <div className={`progress-bar ${status !== CompletionStatus.InProgress ? 'progress-bar--disabled' : ''}`}>
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-bar__text">{`${progress}%`}</span>
      </div>

      {status === CompletionStatus.Done && (
        <div className={`card__overlay card__overlay--done`}>
            <DownloadDoneOutlinedIcon sx={{ fontSize: 140, color: '#27BF8B' }}/>
        </div>
      )}
    </div>
  );
}