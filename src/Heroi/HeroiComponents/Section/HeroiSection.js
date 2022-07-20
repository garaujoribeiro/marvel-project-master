import {
  Typography,
  Button,
  Popover,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HeroiSection.module.css';
import Loading from '../../../Assets/Loading';

function HeroiSection({
  anchorEl,
  setAnchorEl,
  popText,
  setPopText,
  secao,
  setIsOnlySection,
}) {
  const params = useParams();

  let navigate = useNavigate();

  const secaoQuery = useQuery(
    [secao],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}/${secao}?apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const NULA = (secao) =>
    `${secao} sem descrição fornecida pela Marvel, mas você pode ficar por dentro das últimas atualizações da Marvel no botão abaixo que te leva para o Marvel Unlimited!`;

  const seçãoNULATOTAL =
    'Opa, pelo visto este herói não participa de nada nesta seção, mas se quiser ter certeza visite o site da Marvel Unlimited pelo botão abaixo!';

  const { isLoading, data: secaoData, error } = secaoQuery;

  if (isLoading) return <Loading />;
  if (!secaoData) return null;
  if (error) return null;

  return (
    <>
      <section className={styles.secaoContainer}>
        <section className={styles.containerCards}>
          <Typography
            sx={{ color: 'common.black' }}
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
          {secaoData.data.count > 0 ? (
            <section className={styles.section}>
              {secaoData.data.results.map((item, idx) => {
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
                      <Typography
                        sx={{ color: 'common.white' }}
                        variant="caption"
                        component="h5"
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                    <div className={styles.popOver}>
                      <Button
                        sx={{ color: 'error.dark' }}
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
          ) : (
            <section>
              <Typography
                sx={{ margin: '5vh 0', color: 'common.black' }}
                variant="body1"
              >
                {seçãoNULATOTAL}
              </Typography>
            </section>
          )}
        </section>
        {secaoData.data.count > 4 && (
          <Button
            sx={{ color: 'error.dark' }}
            onClick={() => {
              navigate(`/heroi/${params.id}/${secao}/1`);
            }}
            variant="text"
          >{`Ver mais ${
            secao === 'events'
              ? 'eventos'
              : secao === 'comics'
              ? 'revistas'
              : 'series'
          }`}</Button>
        )}
      </section>
    </>
  );
}

export default HeroiSection;
