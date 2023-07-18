import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import React from 'react';
import { Character } from '../data/interface';
  
  export const CharacterCard: React.FC<{ character: Character }> = (props) => {
    return (
      <Card
        raised
        sx={{
          maxWidth: 280,
          margin: '0 auto',
          padding: '0.1em',
        }}
      >
        <CardMedia
          component='img'
          height='250'
          sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
          image={props.character.image}
          title='image'
        />
        <CardContent>
          <Typography gutterBottom variant='h3' component='div'>
            {props.character.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {props.character.species}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={() => window.open(props.character.url, '_blank')}
          >
            Open Card
          </Button>
          {/* <Button size='small'>Share</Button>
          <Button size='small'>Like</Button> */}
        </CardActions>
      </Card>
    );
  };