import { Avatar, Typography, Button, Popover, Rating } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styles from './Heroi.module.css';
import Loading from '../Assets/Loading';
import HeroiSection from './HeroiComponents/Section/HeroiSection';
function Heroi({ favorito, setFavorito }) {
  const [anchorEl, setAnchorEl] = useState(null); // Estado para gerenciar a posição do popOver da descrição
  const [popText, setPopText] = useState(null); // Estado para gerenciar o texto escrito dentro do meu popover.
  const [isOnlySection, setIsOnlySection] = useState(null); // Estado para gerenciar a seção do heroi

  const params = useParams();

  const handleSection = useCallback(() => {
    setIsOnlySection(Boolean(params.secao));
  }, [params.secao, setIsOnlySection]);
  useEffect(handleSection, [handleSection]);

  const fetchOptions = ['events', 'comics', 'series'];

  const NULA = (seção) =>
    `${seção} sem descrição fornecida pela Marvel, mas você pode ficar por dentro das últimas atualizações da Marvel no botão abaixo que te leva para o Marvel Unlimited!`;

  const {
    data: dataHero,
    isLoading,
    error,
  } = useQuery(
    [params.id],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}?apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <Loading />;
  if (!dataHero) return null;
  if (Number(dataHero.data.results[0].id) !== Number(params.id))
    return <Loading />;
  if (error) return <h2>{error.message}</h2>;

  const { name, description } = dataHero.data.results[0];

  return (
    <>
      <section className={styles.bodyContainer}>
        <section className={styles.section}>
          <div className="avatar">
            <article className={styles.titulo}>
              <div className={styles.nameContainer}>
                <Typography variant="h2" className={styles.name}>
                  {name.split('(').length > 1 ? name.split('(')[0] : name}
                </Typography>
                <Typography variant="h6">
                  {name.split('(').length > 1
                    ? name.split('(')[1].replace(')', '')
                    : ''}
                </Typography>
              </div>
              <Avatar
                src={`${dataHero.data.results[0].thumbnail.path}/portrait_incredible.${dataHero.data.results[0].thumbnail.extension}`}
                sx={{ width: '5rem', height: '5rem' }}
              />
            </article>
            <div>
              <div className={styles.popOver}>
                <Button
                  sx={{ color: 'error.dark' }}
                  aria-describedby={'heroi_descricao'}
                  variant="text"
                  onClick={({ currentTarget }) => {
                    setPopText(description ? description : NULA('Herói'));
                    setAnchorEl(currentTarget);
                  }}
                >{`Sobre o herói`}</Button>
                <Popover
                  transitionDuration={0.5}
                  sx={{ width: '70vw' }}
                  id="heroi_descricao"
                  open={
                    anchorEl
                      ? anchorEl.innerHTML.split('<')[0] === 'Sobre o herói'
                      : false
                  }
                  anchorEl={anchorEl}
                  onClose={() => {
                    setAnchorEl(null);
                    setPopText(null);
                  }}
                >
                  <Typography
                    sx={{ padding: '.8rem' }}
                    variant="body1"
                    component="p"
                  >
                    {popText}
                  </Typography>
                </Popover>
                <div className={styles.favoritoContainer}>
                  {' '}
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={favorito === params.id ? 1 : 0}
                    onChange={(e, value) =>
                      value
                        ? setFavorito(params.id)
                        : (setFavorito(null),
                          window.localStorage.removeItem('favorito'))
                    }
                    className={styles.rating}
                    max={1}
                  />
                  <Typography variant="h6" component="span">
                    Favoritar
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.containerCards}>
          {!isOnlySection &&
            fetchOptions.map((item) => (
              <HeroiSection
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                popText={popText}
                setPopText={setPopText}
                secao={item}
              />
            ))}
        </section>
      </section>
    </>
  );
}

export default Heroi;
