import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Assets/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';

function DirecionarHeroi() {
  const { nomeHeroi } = useParams();

  const { data } = useQuery(
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
    if (data)
      navigate(`/marvel-project-master/heroi/${data.data.results[0].id}`);
  }, [navigate, data]);

  return <Loading />;
}

export default DirecionarHeroi;
