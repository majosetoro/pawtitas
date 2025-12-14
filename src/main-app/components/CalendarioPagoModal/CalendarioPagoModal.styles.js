import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../../shared/styles';

const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: screenHeight * 0.85,
    display: 'flex',
    flexDirection: 'column',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.medium,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  instructionsContainer: {
    marginBottom: 16,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  instructionText: {
    ...typography.styles.body,
    color: colors.text.primary,
    flex: 1,
    fontSize: 14,
  },
  selectedCountContainer: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  selectedCountText: {
    ...typography.styles.caption,
    color: colors.primaryDark,
    fontWeight: '600',
    fontSize: 13,
  },
  calendarContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  calendar: {
    borderRadius: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  calendarHeaderText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
  },
  infoContainer: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  infoText: {
    ...typography.styles.caption,
    color: colors.text.primary,
    fontSize: 13,
    lineHeight: 18,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.surface,
  },
});
