import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

// Estilos para la pantalla Home
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
    backgroundColor: colors.background,
    position: 'relative',
    zIndex: 10,
  },
  statusBarSpace: {
    height: 120, // Espacio para la barra de estado
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  logoText: {
    ...typography.styles.h1,
    color: colors.brand.logo,
    fontSize: 24,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
  taglineText: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginTop: 6,
    textAlign: 'center',
  },
  headerTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    paddingTop: 15,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1080,
    backgroundColor: colors.background,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  categoryCard: {
    width: '45%',
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 15,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryTitle: {
    ...typography.styles.bodyBold,
    color: colors.text.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
  categoryDescription: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default styles;
