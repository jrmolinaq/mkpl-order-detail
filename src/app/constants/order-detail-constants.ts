import { ORDER_STATES } from './states';

export const TRACKING_STATES = [
  {
    id: ORDER_STATES.ACCEPTED,
    text: 'Aceptado',
    linePercent: '6%'
  },
  {
    id: ORDER_STATES.ON_ROUTE,
    text: 'En ruta',
    linePercent: '21%'
  },
  {
    id: ORDER_STATES.DELAYED,
    text: 'Retrasado',
    linePercent: '39%'
  },
  {
    id: ORDER_STATES.DELIVERED,
    text: 'Entregado',
    linePercent: '57%'
  },
  {
    id: ORDER_STATES.DELIVERED_NOTE,
    text: 'Entregado**',
    linePercent: '76%'
  },
  {
    id: ORDER_STATES.COMPLETED,
    text: 'Completado',
    linePercent: '100%'
  }
];

export const STATES_INDEX = [
  {
    id: ORDER_STATES.ACCEPTED,
    index: 0
  },
  {
    id: ORDER_STATES.ON_ROUTE,
    index: 1
  },
  {
    id: ORDER_STATES.DELAYED,
    index: 2
  },
  {
    id: ORDER_STATES.DELIVERED,
    index: 3
  },
  {
    id: ORDER_STATES.DELIVERED_NOTE,
    index: 4
  },
  {
    id: ORDER_STATES.COMPLETED,
    index: 5
  }
];
