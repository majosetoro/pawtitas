import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../shared/styles';

const { height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: screenHeight * 0.85,
    maxHeight: screenHeight * 0.85,
  },  
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.medium,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.surface,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  nameAndStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  nombre: {
    ...typography.styles.h3,
    fontSize: 20,
    color: colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ubicacion: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ScrollView debe ocupar el espacio entre header y botones
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  scrollContent: {
    paddingTop: 4,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.styles.bodyBold,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginLeft: 12,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginLeft: 12,
    flex: 1,
  },
  descripcion: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  stepNumberText: {
    ...typography.styles.caption,
    fontWeight: '800',
    color: colors.text.inverse,
    fontSize: 12,
  },
  stepText: {
    ...typography.styles.body,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  // Warning section
  warningContainer: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryDark,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  warningTitle: {
    ...typography.styles.bodyBold,
    fontSize: 15,
    color: colors.text.primary,
  },
  warningContent: {
    gap: 8,
  },
  warningText: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  // Botones fijos
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
