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
    height: 10, // Espacio para la barra de estado
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
  topRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 15,
  marginBottom: 10,
},
searchContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  borderRadius: 20,
  paddingHorizontal: 10,
  marginRight: 10,
  marginTop:50
},
searchIcon: {
  marginRight: 6,
},
searchInput: {
  flex: 1,
  height: 40,
},
notificationButton: {
  position: "relative",
  marginTop:50
},
badge: {
  position: "absolute",
  top: -5,
  right: -5,
  backgroundColor: "red",
  borderRadius: 10,
  paddingHorizontal: 5,
},
badgeText: {
  color: "#fff",
  fontSize: 12,
},
locationButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 15,
  paddingVertical: 8,
  backgroundColor: "#f2e0f2ff",
  borderRadius: 20,
  marginTop:20
},
locationText: {
  marginLeft: 6,
  color: "#00897B",
  fontWeight: "500",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
},
modalContent: {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 12,
  width: "80%",
},
modalTitle: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 15,
},
modalOption: {
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
},
closeButton: {
  marginTop: 15,
  backgroundColor: "#fcd5edff",
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: "center",
},

});

export default styles;
