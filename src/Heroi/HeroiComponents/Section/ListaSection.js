import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
  Stack,
  Button,
  Popover,
} from '@mui/material';
import styles from './ListaSection.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../Assets/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';

function ListaSection() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popText, setPopText] = useState(null);
  const { id, secao, pageURL } = useParams();

  if (page !== pageURL) setPage(pageURL);

  const {
    data: secaoData,
    isLoading,
    isFetching,
  } = useQuery(
    [`${id} ${secao}`, page],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/${secao}?offset=${
          20 * (page - 1)
        }&apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60, // 1 hora
    },
  );

  const NULA = (secao) =>
    `${secao} sem descrição fornecida pela Marvel, mas você pode ficar por dentro das últimas atualizações da Marvel no botão abaixo que te leva para o Marvel Unlimited!`;

  const handlePagination = (e, pageNumber) => {
    setPage(pageNumber);
    navigate(`/marvel-project-master/heroi/${id}/${secao}/${pageNumber}`);
  };

  if (isLoading || isFetching) return <Loading />;
  if (!secaoData) return null;

  return (
    <section className={styles.secaoContainer}>
      <section className={styles.containerCards}>
        <Typography
          sx={{ textAlign: 'center', color: 'common.black' }}
          variant="h2"
          component="h3"
          className={styles.tituloSecao}
        >
          {secao === 'events'
            ? 'Eventos'
            : secao === 'comics'
            ? 'Revistas'
            : 'Series'}
        </Typography>
        <section className={styles.section}>
          {secaoData.data.results.map((item, idx) => {
            return (
              <Card key={item.id} sx={{ width: '20vw', padding: '.8vh 0' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                    alt={item.name}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography
                    sx={{ textAlign: 'center' }}
                    variant="caption"
                    component="h5"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
                <div className={styles.popOver}>
                  <Button
                    sx={{ padding: '.5vh .5vw', color: 'error.dark' }}
                    aria-describedby={item.id}
                    variant="text"
                    onClick={({ currentTarget }) => {
                      setAnchorEl(currentTarget);
                      setPopText(
                        item.description
                          ? item.description
                          : NULA(
                              secao === 'events'
                                ? 'Evento'
                                : secao === 'comics'
                                ? 'Revista'
                                : 'Serie',
                            ),
                      );
                    }}
                  >{`Sobre ${
                    secao === 'events'
                      ? 'o evento'
                      : secao === 'comics'
                      ? 'a revista'
                      : 'a serie'
                  }`}</Button>
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
                          `Sobre ${
                            secao === 'events'
                              ? 'o evento'
                              : secao === 'comics'
                              ? 'a revista'
                              : 'a serie'
                          }`
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
      </section>
      <section className={styles.pagina}>
        <Stack direction="row" spacing={2}>
          <Pagination
            size="small"
            page={Number(page)}
            onChange={handlePagination}
            count={Math.ceil(secaoData.data.total / 20)}
          />
          {/*20 é o numero de hérois por página*/}
        </Stack>
      </section>
    </section>
  );
}

export default ListaSection;
