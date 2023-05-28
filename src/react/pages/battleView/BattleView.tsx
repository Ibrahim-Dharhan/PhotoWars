import React, { useState } from 'react';
import axios from 'axios';
import {
  Stack
} from '@mui/material';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { CommentModal } from '../../components/commentModal/CommentModal';
import { Outlet, redirect, useParams } from 'react-router-dom';

const battleViewLoader = async ({ params }) => {
  const id = params.id
  const path = `/battle/${id}`;
  try {
    const res = await axios.get(path);
  } catch (err) {
    if (err.response.status === 404) {
      return redirect('/404');
    }
  }
  return null;
}

const BattleView = () => {
  const { id } = useParams();

  const [submitted, setSubmitted] = useState(false);
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
    <Stack
      alignItems="center"
      sx={{
        width: "100%"
      }}
    >
      <BattleCard
        battleId={id}
        submitted={submitted}
        setSubmitted={setSubmitted}
        showModal={showModal}
      />
      <Outlet context={{ setSubmitted, showModal }}/>
      <CommentModal 
        open={modalOpen}
        handleClose={closeModal}
        variant={modalVariant}
        id={modalId}
        displayName={modalAuthor}
        caption={modalCaption}
        filename={modalImage}
      />
    </Stack>
  );
};

export { BattleView, battleViewLoader };
