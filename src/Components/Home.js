import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import styles from './Home.module.css';
function Home({ data, isFetching }) {
  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardGrid}>
        {data &&
          data.data.results.map((item, idx) => {
            return (
              <Card sx={{ width: '17vw' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="article">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </section>
  );
}

export default Home;
