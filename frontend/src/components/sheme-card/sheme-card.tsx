import './sheme-card.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';

interface ShemeCardProps {
  title: string;
  img: string;
  status: 'default' | 'done' | 'deleted'; 
  onDelete: () => void;
}

export default function ShemeCard({ title, img, status, onDelete }: ShemeCardProps) {
  const progress = 66;

  return (
    <div className={`card card--${status}`}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        {status === 'default' && (
          <IconButton
            size="small"
            className="close-button"
            onClick={status === 'default' ? onDelete : undefined} 
            disabled={status !== 'default'}
            sx={{ padding: 0 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>

      <div className="card__image-container">
        <img
          src={img}
          alt="Scheme Preview"
          className="card__image"
        />
      </div>

      <div className={`progress-bar ${status !== 'default' ? 'progress-bar--disabled' : ''}`}>
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-bar__text">{`${progress}%`}</span>
      </div>

      {(status === 'done' || status === 'deleted') && (
        <div className={`card__overlay card__overlay--${status}`}>
          {status === 'done' && (
            <DownloadDoneOutlinedIcon sx={{ fontSize: 140, color: '#27BF8B' }}/>
          )}
          {status === 'deleted' && (
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 140, color: '#EB3333' }}/>
          )}
        </div>
      )}
    </div>
  );
}