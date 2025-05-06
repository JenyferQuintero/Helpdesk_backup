export const routeConfig = {
    '/home': {
      name: 'breadcrumbs.home',
      protected: false
    },
    '/CrearCasoUse': {
      name: 'breadcrumbs.createCase',
      protected: true,
      roles: ['user', 'admin']
    },
    '/Tickets': {
      name: 'breadcrumbs.tickets',
      protected: true,
      roles: ['user', 'admin']
    },
    '/Tickets/:id': {
      name: 'breadcrumbs.ticketDetail',
      protected: true,
      roles: ['user', 'admin']
    },
    '/EncuestaSatisfaccion/:id': {
      name: 'breadcrumbs.survey',
      protected: true,
      roles: ['user']
    },
    '/SolucionTickets': {
      name: 'breadcrumbs.ticketSolution',
      protected: true,
      roles: ['admin', 'support']
    }
  };
  
  export const getRouteConfig = (path) => {
    // Buscar coincidencia exacta
    if (routeConfig[path]) return routeConfig[path];
    
    // Manejar rutas con parámetros
    for (const [routePath, config] of Object.entries(routeConfig)) {
      if (routePath.includes(':')) {
        const regex = new RegExp(routePath.replace(/:\w+/g, '([^/]+)'));
        if (regex.test(path)) return config;
      }
    }
    
    return null;
  };