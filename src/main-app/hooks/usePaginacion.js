import { useState, useMemo } from 'react';

const ITEMS_POR_PAGINA = 15;

export const usePaginacion = (items, itemsPorPagina = ITEMS_POR_PAGINA) => {
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(items.length / itemsPorPagina);

  // Obtener los items de la página actual
  const itemsActuales = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * itemsPorPagina;
    const indiceFin = indiceInicio + itemsPorPagina;
    return items.slice(indiceInicio, indiceFin);
  }, [items, paginaActual, itemsPorPagina]);

  // Resetear a la primera página cuando cambian los items
  const reiniciarPagina = () => {
    setPaginaActual(1);
  };

  // Cambiar de página
  const manejarCambioPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return {
    paginaActual,
    totalPaginas,
    itemsActuales,
    manejarCambioPagina,
    reiniciarPagina,
  };
};

