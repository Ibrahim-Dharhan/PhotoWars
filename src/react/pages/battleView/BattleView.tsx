import React, { useState } from 'react';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { CommentModal } from '../../components/commentModal/CommentModal';
import { Outlet, useParams, useOutletContext } from 'react-router-dom';

const BattleView = () => {
  const [numBVSubmissions, setNumBVSubmissions] = useState(0);
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState('');
  const [modalId, setModalId] = useState('');
  const [modalAuthor, setModalAuthor] = useState('');
  const [modalCaption, setModalCaption] = useState('');
  const [modalImage, setModalImage] = useState('');

  const showModal = (variant: string, id: string, author: string, caption: string, filename: string) => {
    setModalAuthor(author);
    setModalId(id);
    setModalVariant(variant);
    setModalCaption(caption);
    setModalImage(filename);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalAuthor('');
    setModalId('');
    setModalVariant('');
    setModalCaption('');
    setModalImage('');
  };
  
  return (
    <React.Fragment>
      <BattleCard
        battleId={id}
        numBVSubmissions={numBVSubmissions}
        setNumBVSubmissions={setNumBVSubmissions}
        showModal={showModal}
      />
      <Outlet context={{numBVSubmissions, setNumBVSubmissions, showModal}}/>
      <CommentModal 
        open={modalOpen}
        handleClose={closeModal}
        variant={modalVariant}
        id={modalId}
        displayName={modalAuthor}
        caption={modalCaption}
        filename={modalImage}
      />
    </React.Fragment>
  );
};

export function useShowModal() {
  return useOutletContext<any>();
}

export { BattleView };
