import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import { AddButton } from '~/components/MenuButton';
import SearchField from '~/components/Form/SearchField';

import {
  Container,
  InitialContent,
  DeliveryListTable,
  TableHead,
} from './styles';

import DeliveryItem from './DeliveryItemTable';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');
      const { data } = response;

      setDeliveries(data);
    }

    loadDeliveries();
  }, []);

  async function updateDeliveries() {
    const response = await api.get('deliveries');
    const { data } = response;

    setDeliveries(data);
  }

  async function onChange(event) {
    const response = await api.get(`deliveries?q=${event.target.value}`);
    const { data } = response;
    setDeliveries(data);
  }

  return (
    <Container>
      <InitialContent>
        <strong>Gerenciando encomendas</strong>
        <aside>
          <SearchField onChange={onChange} placeholder="encomendas" />
          <AddButton onClick={() => history.push('/deliveries/new')} />
        </aside>
      </InitialContent>
      <DeliveryListTable>
        <thead>
          <TableHead>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </TableHead>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <DeliveryItem
              key={delivery.id}
              delivery={delivery}
              updateDeliveries={updateDeliveries}
            />
          ))}
        </tbody>
      </DeliveryListTable>
    </Container>
  );
}
