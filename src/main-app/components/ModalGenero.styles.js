import { StyleSheet } from "react-native";
import { colors, typography } from "../../shared/styles";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: typography.fontFamily.title,
    color: colors.text.primary,
  },
  modalCloseButton: {
    fontSize: 16,
    fontFamily: typography.fontFamily.bodySemiBold,
    color: colors.brand.highlight,
  },
  modalPicker: {
    backgroundColor: colors.surface,
  },
});

