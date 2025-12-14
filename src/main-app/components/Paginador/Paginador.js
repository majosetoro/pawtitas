import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './Paginador.styles';

const Paginador = ({ 
  paginaActual, 
  totalPaginas, 
  onCambioPagina,
  maxPaginasVisibles = 5 
}) => {
  // Calcular el rango de páginas visibles
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // Páginas a mostrar a cada lado de la actual
    
    if (totalPaginas <= 7) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPaginas; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);
      
      // Calcular rango alrededor de la página actual
      const startPage = Math.max(2, paginaActual - delta);
      const endPage = Math.min(totalPaginas - 1, paginaActual + delta);
      
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPaginas - 1) {
        pages.push('ellipsis-end');
      }
      
      // Siempre mostrar última página
      pages.push(totalPaginas);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (paginaActual > 1) {
      onCambioPagina(paginaActual - 1);
    }
  };

  const handleNext = () => {
    if (paginaActual < totalPaginas) {
      onCambioPagina(paginaActual + 1);
    }
  };

  if (totalPaginas <= 1) return null;

  return (
    <View style={styles.container}>
      {/* Botón anterior */}
      <TouchableOpacity
        style={[
          styles.arrowButton,
          paginaActual === 1 && styles.arrowButtonDisabled
        ]}
        onPress={handlePrevious}
        disabled={paginaActual === 1}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={paginaActual === 1 ? '#ccc' : '#666'}
        />
      </TouchableOpacity>

      {/* Números de página */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pagesContainer}
      >
        {pageNumbers.map((page, index) => {
          // Ellipsis
          if (typeof page === 'string' && page.startsWith('ellipsis')) {
            return (
              <View key={page} style={styles.ellipsisContainer}>
                <Text style={styles.ellipsisText}>...</Text>
              </View>
            );
          }
          
          // Botón de página
          return (
            <TouchableOpacity
              key={page}
              style={[
                styles.pageButton,
                paginaActual === page && styles.pageButtonActive
              ]}
              onPress={() => onCambioPagina(page)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pageText,
                  paginaActual === page && styles.pageTextActive
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Botón siguiente */}
      <TouchableOpacity
        style={[
          styles.arrowButton,
          paginaActual === totalPaginas && styles.arrowButtonDisabled
        ]}
        onPress={handleNext}
        disabled={paginaActual === totalPaginas}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={paginaActual === totalPaginas ? '#ccc' : '#666'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Paginador;

