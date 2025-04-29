import { JSX, useState } from 'react';
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';
import CreateFormModal from 'components/create-form-modal/create-form-modal';
import './main-screen.css';
import ShemeCard from 'components/sheme-card/sheme-card';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header/header';

export default function MainScreen(): JSX.Element {
  const [cards, setCards] = useState([
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
    { id: 1, title: 'Схема 1', status: 'default' },
    { id: 2, title: 'Схема 2', status: 'done' },
    { id: 3, title: 'Схема 3', status: 'deleted' },
  ]);

  const [currentCardToDelete, setCurrentCardToDelete] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setShowDeleteModal(false);
    setCurrentCardToDelete(null);
  };

  const handleDeleteButton = () => {
    if (currentCardToDelete !== null) {
      handleDelete(currentCardToDelete);
    }
  };
  const handleCardDeleteClick = (id: number) => {
    setCurrentCardToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="page-container">
      <Header/>
      <div className='main-content'>
        <div className='heading'>
          <h2>Мои работы</h2>
        </div>    
        {showDeleteModal && (
          <Modal
            title="Удаление схемы"
            message="Вы уверены, что хотите удалить схему?"
            primaryButton={{
              text: 'Удалить',
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
        {showCreateModal && (
          <CreateFormModal
            onClose={() => setShowCreateModal(false)}
          />
        )}
        <div className='cards-container'>
          {cards.map((card) => (
            <ShemeCard
              key={card.id}
              title={card.title}
              img='https://detisun.ru/foto/4341/pletenie_iz_bisera_dlia_detei_7_let_poetapno_dlia_nachinaiushchikh_4.webp'
              status={card.status as 'default' | 'done' | 'deleted'}
              onDelete={() => handleCardDeleteClick(card.id)}
            />
          ))}
        </div>
        <Button 
          className='button-create' 
          text='Создать' 
          variant='save-transparent' 
          icon={<AddIcon/>} 
          onClick={() => setShowCreateModal(true)}
        />
      </div>
    </div>
  );
}