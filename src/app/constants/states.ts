export const ORDER_STATES = {
  ASSIGNED: 'assigned',
  COMPLETED: 'completed',
  ACCEPTED: 'accepted',
  DISPATCHING: 'dispatching',
  DELIVERED: 'delivered',
  REJECTED: 'rejected',
  DELAYED: 'delayed',
  TIMED_OUT: 'timed_out',
  DELIVERED_NOTE: 'delivered_news',
  ON_ROUTE: 'on_route',
  MANUAL: 'manual_purchase',
  DEVOLUTION: 'devolution'
};

export const STATES = {
  [ORDER_STATES.ASSIGNED]: {
    class: 'info',
    text: 'Asignado'
  },
  [ORDER_STATES.COMPLETED]: {
    class: 'success',
    text: 'Completado'
  },
  [ORDER_STATES.ACCEPTED]: {
    class: 'success',
    text: 'Aceptado'
  },
  [ORDER_STATES.DISPATCHING]: {
    class: 'success',
    text: 'Aceptado'
  },
  [ORDER_STATES.DELIVERED]: {
    class: 'success',
    text: 'Entregado'
  },
  [ORDER_STATES.REJECTED]: {
    class: 'danger',
    text: 'Rechazado'
  },
  [ORDER_STATES.DELAYED]: {
    class: 'warning',
    text: 'Retrasado'
  },
  [ORDER_STATES.TIMED_OUT]: {
    class: 'danger',
    text: 'Caducado'
  },
  [ORDER_STATES.DELIVERED_NOTE]: {
    class: 'warning',
    text: 'Entregado**'
  },
  [ORDER_STATES.ON_ROUTE]: {
    class: 'progress',
    text: 'En ruta'
  },
  [ORDER_STATES.MANUAL]: {
    class: 'manual',
    text: 'Manual'
  },
  [ORDER_STATES.DEVOLUTION]: {
    class: 'danger',
    text: 'Devolución'
  }
};

export const NOTIFICATION_TYPES = {
  DANGER: {
    image: '/o/mkpl-order/icons/danger-notification.svg',
    class: 'danger'
  },
  INFO: {
    image: '/o/mkpl-order/icons/info-notification.svg',
    class: 'info'
  },
  SUCCESS: {
    image: '/o/mkpl-order/icons/success-notification.svg',
    class: 'success'
  }
};
