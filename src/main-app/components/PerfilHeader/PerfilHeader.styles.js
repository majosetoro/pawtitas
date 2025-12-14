import { StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

// Estilos para el componente PerfilHeader
export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingBottom: 16,
    width: "100%",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    position: "relative",
    minHeight: 60,
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  title: {
    color: colors.text.primary,
    fontSize: 28,
    fontFamily: typography.fontFamily.titleRegular,
    lineHeight: 36,
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "500",
  },
  rightComponent: {
    marginLeft: "auto",
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.medium,
    marginHorizontal: 20,
  },
});

export default styles;
