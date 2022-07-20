import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Assets/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

function DirecionarHeroi() {
  const { nomeHeroi } = useParams();

  const { data, isLoading, isFetching, error } = useQuery(
    [nomeHeroi],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?name=${nomeHeroi}&apikey=175433ccb801e487f623da18c023d07e
        `,
      );
      return response.data;
    },
    {
      refetchOnMount: 'true',
      staleTime: 60 * 1000 * 60, // 1 hora
    },
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate(`/heroi/${data.data.results[0].id}`);
  }, [navigate, data]);

  if (!data) return null;
  if (isLoading || isFetching) return <Loading />;
  if (error)
    return (
      <Typography variant="h3" component={'p'}>
        {error.message}
      </Typography>
    );
}

export default DirecionarHeroi;
