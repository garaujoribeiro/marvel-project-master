import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import styles from './ListaBusca.module.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Assets/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
function ListaBusca() {
  const params = useParams();

  const { data, isLoading, isFetching } = useQuery(
    [params.buscarPersonagem],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${params.buscarPersonagem}&apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: 'false',
      staleTime: 60 * 1000 * 60, // 1 hora
    },
  );

  if (isLoading || isFetching) return <Loading />;
  if (!data) return <>Olá mundo</>;

  return (
    <>
      <section className={styles.cardContainer}>
        <div className={styles.cardGrid}>
          {data &&
            data.data.results.map((item, idx) => {
              return (
                <Card sx={{ width: '17vw' }} key={item.id + idx}>
                  <CardActionArea>
                    <Link to={`/heroi/${item.id}`}>
                      <CardMedia
                        component="img"
                        image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="span">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default ListaBusca;
