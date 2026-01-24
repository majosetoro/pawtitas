import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 16,
    maxHeight: '85%',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: colors.text.secondary,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.styles.bodyBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  closeButton: {
    padding: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.styles.bodyBold,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  infoRow: {
    ...typography.styles.body,
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.secondary,
    width: '30%',
  },
  value: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  documentSection: {
    marginBottom: 8,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  documentIcon: {
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activateButton: {
    backgroundColor: colors.success,
  },
  deactivateButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeStatus: {
    backgroundColor: `${colors.success}20`,
  },
  pendingStatus: {
    backgroundColor: `${colors.warning}20`,
  },
  inactiveStatus: {
    backgroundColor: `${colors.error}20`,
  },
  activeStatusText: {
    color: colors.success,
  },
  pendingStatusText: {
    color: colors.warning,
  },
  inactiveStatusText: {
    color: colors.error,
  },
  motivoInput: {
    ...typography.styles.body,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 80,
    color: colors.text.primary,
    backgroundColor: colors.surface,
  },
  // Estilos para servicios ofrecidos
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  serviceText: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 6,
  },
  // Estilos para disponibilidad
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    minWidth: 80,
  },
  availabilityText: {
    ...typography.styles.body,
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 6,
  },
  unavailableText: {
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  // Estilos para estado del servicio
  serviceStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveText: {
    color: colors.text.secondary,
  },
});
