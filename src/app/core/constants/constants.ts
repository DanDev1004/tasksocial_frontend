export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
  };
  
  const apiurl = 'http://localhost/gestion_tareas/backend/index.php/api';
  
  export const apiEndpoint = {
    AuthEndpoint: {
      login: `${apiurl}/auth?action=login`,  
      register: `${apiurl}/auth?action=register`,
    },
    TareaEndpoint: {
      create: `${apiurl}/tareas?action=crear`,
      getAll: `${apiurl}/tareas?action=obtenerPorUsuario`,
      update: `${apiurl}/tareas?action=actualizar`,
      delete: `${apiurl}/tareas?action=eliminar`,
      deleteCompleted: `${apiurl}/tareas?action=eliminarHechas`,
      generatePDF: `${apiurl}/pdf`,
    },
  };
  