import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Link,
} from '@mui/material';
import PropTypes from 'prop-types';

function ModelItem({ model }) {
  return (
    <Card
      sx={{
        width: '100%',
        transition: '0.3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        borderRadius: '0.5rem',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 24px 80px -12.125px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        },
      }}
    >
      {model.image && (
        <CardContent>
          <CardMedia
            component="img"
            height="140"
            image={model.image}
            alt={model.name}
            sx={{ marginBottom: '1rem' }}
          />
          <Typography
            variant="h7"
            fontWeight="500"
            component="div"
            whiteSpace="pre-wrap"
            overflow="hidden"
            textOverflow="ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {model.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mô tả:
            {' '}
            {model.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đường dẫn video:
            {' '}
            <Link href={model.image} target="_blank">
              Link
            </Link>
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

ModelItem.propTypes = {
  model: PropTypes.instanceOf(Object).isRequired,
};

export default ModelItem;
