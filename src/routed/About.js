import * as React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import foto from '../assets/avatar06-2021.jpg'

export default function About() {

  const [likes, setLikes] = React.useState(
    () => parseInt(window.localStorage.getItem('likes')) || 0
  )

  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)    
  }, [likes])

  return (
    <>
      <h1>Sobre o autor</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="345"
          image={foto}
          alt="Minha foto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Fausto G. Cintra
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Formado em Ciência da Computação pela Universidade de Franca (1997), trabalha desde então na área de Tecnologia da Informação.<br />
            Desde 2014, é professor da Fatec Franca, tendo ministrado várias disciplinas nos cursos de Análise e Desenvolvimento de Sistemas, Gestão da Produção Industrial e Desenvolvimento de <em>Software</em> Multiplataforma.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={() => setLikes(likes + 1)}
          >
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </>

  )
}