import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
// import { fetchModels } from '../firebase';
import NoDataFound from '../components/NoDataFound';
import Spinner from '../components/Spinner';
import ModelItem from '../components/ModelItem';
import {fetchModels} from '../firebase';

export default function ModelList() {
  const [modelList, setModelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const data = await fetchModels();
        await setModelList(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log('hello', modelList);
  }, []);

  return (
    <>
      <Spinner isLoading={loading} />
      <Typography variant="h5" marginY="1rem">
        Danh sách mô hình
      </Typography>
      {modelList.length === 0 && !loading ? (
        <NoDataFound />
      ) : (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {modelList.map(([modelId, modelData]) => (
            <Grid item xs={12} sm={6} md={3} key={modelId} style={{ display: 'flex' }}>
              <ModelItem
                model={modelData}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
