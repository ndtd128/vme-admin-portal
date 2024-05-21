import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { get, ref } from 'firebase/database';
import ModelItem from '../components/ModelItem';
import { db } from '../firebase';

export default function ModelList() {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const modelsRef = ref(db, 'models');
    get(modelsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const modelsArray = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setModelList(modelsArray);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <Typography variant="h5" marginY="1rem">
        Danh sách mô hình
      </Typography>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {modelList.map((model) => (
          <Grid item xs={12} sm={6} md={3} key={model.id} style={{ display: 'flex' }}>
            <ModelItem
              model={model}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
