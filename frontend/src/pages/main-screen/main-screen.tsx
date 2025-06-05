import { JSX, useRef, useState } from 'react';
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';
import CreateFormModal from 'components/create-form-modal/create-form-modal';
import './main-screen.css';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/header/header';
import SchemasList from 'components/schemas-list/schemas-list';
import { useAppSelector } from 'hooks/use-app-selector';
import { getIsSchemasLoading, getSchemas } from 'store/slices/schemas-data/selectors';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { fetchSchemasAction } from 'store/api-actions/schemas-api-actions';
import Spinner from 'components/spinner/spinner';
import { deleteSchemaAction } from 'store/api-actions/schema-api-actions';

export default function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFirstFetch = useRef(true);
  const isSchemasLoading = useAppSelector(getIsSchemasLoading);
  const schemas = useAppSelector(getSchemas);

  const [currentCardToDelete, setCurrentCardToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteSchemaAction(id));
    setShowDeleteModal(false);
    setCurrentCardToDelete(null);
  };

  const handleDeleteButton = () => {
    if (currentCardToDelete !== null) {
      handleDelete(currentCardToDelete);
    }
  };
  const handleCardDeleteClick = (id: string) => {
    setCurrentCardToDelete(id);
    setShowDeleteModal(true);
  };

  if(isFirstFetch.current) {
    if(!isSchemasLoading) {
      dispatch(fetchSchemasAction());
    }

    isFirstFetch.current = false;
    return <Spinner />
  }

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
        <SchemasList schemas={schemas} handleSchemaDelete={handleCardDeleteClick}/>
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