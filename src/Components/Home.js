import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from '@mui/material';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import { allHeroes } from './AllHeroes';
function Home() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery(
    ['herois', page],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?offset=${
          20 * page
        }&apikey=175433ccb801e487f623da18c023d07e`,
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60, // 1 hora
    },
  );

  if (isLoading) return <Loading />;
  if (!data) return null;

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
      <section className={styles.pagina}>
        <Pagination
          onChange={(e, pageNumber) => {
            setPage(pageNumber);
          }}
          size="large"
          count={Math.floor(allHeroes.length / 20)}
        />
        {/*20 é o numero de hérois por página*/}
      </section>
    </>
  );
}

export default Home;
