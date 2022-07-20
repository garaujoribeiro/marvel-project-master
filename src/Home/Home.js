import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
  Stack,
} from '@mui/material';
import styles from './Home.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Assets/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
function Home() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { pageURL } = useParams();

  if (page !== pageURL) setPage(pageURL);

  const { data, isLoading, isFetching } = useQuery(
    ['herois', page],
    async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?offset=${
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

  const handlePagination = (e, pageNumber) => {
    setPage(pageNumber);
    navigate(`/home/${pageNumber}`);
  };

  if (isLoading || isFetching) return <Loading />;
  if (!data) return null;

  return (
    <>
      <section className={styles.Home}>
        {' '}
        <section className={styles.cardContainer}>
          <div className={styles.cardGrid}>
            {data &&
              data.data.results.map((item, idx) => {
                return (
                  <Card sx={{ width: '20vw' }} key={item.id + idx}>
                    <CardActionArea>
                      <Link to={`/heroi/${item.id}`}>
                        <CardMedia
                          component="img"
                          image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                          alt={item.name}
                        />
                        <CardContent>
                          <Typography
                            sx={{ textAlign: 'center' }}
                            variant="body1"
                            component="h2"
                          >
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
          <Stack direction="row" spacing={2}>
            <Pagination
              size="small"
              page={Number(page)}
              onChange={handlePagination}
              count={Math.ceil(data.data.total / 20)}
            />
            {/*20 é o numero de hérois por página*/}
          </Stack>
        </section>
      </section>
    </>
  );
}

export default Home;
