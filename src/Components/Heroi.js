import {
  Avatar,
  Typography,
  Button,
  Popover,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styles from './Heroi.module.css';
import Loading from './Loading';

function Heroi() {
  const [anchorEl, setAnchorEl] = useState(null); // Estado para gerenciar a posição do popOver da descrição
  const [popText, setPopText] = useState(null); // Estado para gerenciar o texto escrito dentro do meu popover.

  const params = useParams();

  const heroQuery = useQuery(
    ['hero'],
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

  const comicsQuery = useQuery(
    ['comics'],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}/comics?orderBy=-onsaleDate&limit=5&apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const eventQuery = useQuery(
    ['events'],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}/events?apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const seriesQuery = useQuery(
    ['series'],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}/series?apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const NULA = (seção) =>
    `${seção} sem descrição fornecida pela Marvel, mas você pode ficar por dentro das últimas atualizações da Marvel no botão abaixo que te leva para o Marvel Unlimited!`;

  const seçãoNULATOTAL =
    'Opa, pelo visto este herói não participa de nada nesta seção, mas se quiser ter certeza visite o site da Marvel Unlimited pelo botão abaixo!';

  const {
    isLoading: isLoadingHero,
    data: dataHero,
    error: errorHero,
  } = heroQuery;
  const {
    isLoading: isLoadingEvent,
    data: dataEvent,
    error: errorEvent,
  } = eventQuery;
  const {
    isLoading: isLoadingComics,
    data: dataComics,
    error: errorComics,
  } = comicsQuery;
  const {
    isLoading: isLoadingSeries,
    data: dataSeries,
    error: errorSeries,
  } = seriesQuery;

  if (isLoadingHero || isLoadingEvent || isLoadingComics || isLoadingSeries)
    return <Loading />;
  if (Number(dataHero.data.results[0].id) !== Number(params.id))
    return <Loading />;
  if (!dataHero || !dataEvent || !dataComics || !dataSeries) return null;
  if (errorHero || errorEvent || errorComics || errorSeries) return null;

  const { name, description, urls } = dataHero.data.results[0];

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
            <div className={styles.popOver}>
              <Button
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
                <Button href={urls[0].url} variant="text">
                  Saiba mais
                </Button>
              </Popover>
            </div>
          </div>
        </section>
        <section className={styles.containerCards}>
          <Typography
            variant="h2"
            component="h3"
            className={styles.tituloSecao}
          >
            Eventos
          </Typography>
          {dataEvent.data.count > 0 ? (
            <section className={styles.events}>
              {dataEvent.data.results.map((item, idx) => {
                if (idx > 3) return null;
                return (
                  <Card key={item.id} sx={{ width: '20vw' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                        alt={item.name}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography variant="h6" component="h5">
                        {item.title}
                      </Typography>
                    </CardContent>
                    <div className={styles.popOver}>
                      <Button
                        aria-describedby={item.id}
                        variant="text"
                        onClick={({ currentTarget }) => {
                          setAnchorEl(currentTarget);
                          setPopText(
                            item.description
                              ? item.description
                              : NULA('Evento'),
                          );
                        }}
                      >{`Sobre o evento`}</Button>
                      <Popover
                        transitionDuration={0.3}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        sx={{ width: '100vw' }}
                        id={item.id}
                        open={
                          anchorEl
                            ? anchorEl.innerHTML.split('<')[0] ===
                              'Sobre o evento'
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
                    </div>
                  </Card>
                );
              })}
            </section>
          ) : (
            <section>
              <Typography sx={{ margin: '5vh 0' }} variant="body1">
                {seçãoNULATOTAL}
              </Typography>
            </section>
          )}
          <Typography
            variant="h2"
            component="h3"
            className={styles.tituloSecao}
          >
            Revistas
          </Typography>
          {dataComics.data.count > 0 ? (
            <section className={styles.events}>
              {dataComics.data.results.map((item, idx) => {
                if (idx > 3) return null;
                return (
                  <Card key={item.id} sx={{ width: '20vw' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                        alt={item.name}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography variant="h6" component="h5">
                        {item.title}
                      </Typography>
                    </CardContent>
                    <div className={styles.popOver}>
                      <Button
                        aria-describedby={item.id}
                        variant="text"
                        onClick={({ currentTarget }) => {
                          setAnchorEl(currentTarget);
                          setPopText(
                            item.description
                              ? item.description
                              : NULA('Revista'),
                          );
                        }}
                      >{`Sobre a revista`}</Button>
                      <Popover
                        transitionDuration={0.3}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        sx={{ width: '100vw' }}
                        id={item.id}
                        open={
                          anchorEl
                            ? anchorEl.innerHTML.split('<')[0] ===
                              'Sobre a revista'
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
                    </div>
                  </Card>
                );
              })}
            </section>
          ) : (
            <section>
              <Typography sx={{ margin: '5vh 0' }} variant="body1">
                {seçãoNULATOTAL}
              </Typography>
            </section>
          )}
          <Typography
            variant="h2"
            component="h3"
            className={styles.tituloSecao}
          >
            Series
          </Typography>
          {dataSeries.data.count > 0 ? (
            <section className={styles.events}>
              {dataSeries.data.results.map((item, idx) => {
                if (idx > 3) return null;
                return (
                  <Card key={item.id} sx={{ width: '20vw' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                        alt={item.name}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography variant="h6" component="h5">
                        {item.title}
                      </Typography>
                    </CardContent>
                    <div className={styles.popOver}>
                      <Button
                        aria-describedby={item.id}
                        variant="text"
                        onClick={({ currentTarget }) => {
                          setAnchorEl(currentTarget);
                          setPopText(
                            item.description ? item.description : NULA('Serie'),
                          );
                        }}
                      >{`Sobre a serie`}</Button>
                      <Popover
                        transitionDuration={0.3}
                        anchorOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'center',
                          horizontal: 'center',
                        }}
                        sx={{ width: '100vw' }}
                        id={item.id}
                        open={
                          anchorEl
                            ? anchorEl.innerHTML.split('<')[0] ===
                              'Sobre a serie'
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
                    </div>
                  </Card>
                );
              })}
            </section>
          ) : (
            <section>
              <Typography sx={{ margin: '5vh 0' }} variant="body1">
                {seçãoNULATOTAL}
              </Typography>
            </section>
          )}
          <Button
            href={
              'http://marvel.com/comics/collection/73526/guardians_of_the_galaxy_vol_2_faithless_trade_paperback?utm_campaign=apiRef&utm_source=175433ccb801e487f623da18c023d07e'
            }
            variant="outlined"
          >
            Mais revistas na Marvel Unlimited
          </Button>
        </section>
      </section>
    </>
  );
}

export default Heroi;
