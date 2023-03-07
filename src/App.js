import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://www.grupofortune.com.br/integracao/softwareexpress/atualizacao/portal/api-consulta-historico.php')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
           {data?.map((item) => (
              <div key={item.historico_id}>
                <p>{item.historico_id}</p>
                <p>{item.historico_nome}</p>
                <p>{item.dia_semana}</p>
              </div>
            ))}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
