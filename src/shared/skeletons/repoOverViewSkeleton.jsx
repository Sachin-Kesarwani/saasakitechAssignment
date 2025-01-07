import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { themestyles } from "../../theme";
import { GlobalContext } from "../../constatnts/context";

const RepoOverviewSkeleton = () => {
  const { state } = useContext(GlobalContext);
  const { isDarkMode = false } = state;
  const theme = themestyles(isDarkMode);
  const bg = { backgroundColor: isDarkMode ? "#4b494d" : "#e6e3e3" };

  return (
    <View style={[styles.card, theme.container, theme.text]}>
      <View style={[styles.ownerContainer]}>
        <View style={[styles.avatar, bg]}></View>
        <View style={[styles.ownerName, bg]}></View>
      </View>
      <View style={[styles.repoName, bg]}></View>
      <View style={[styles.description, bg]}></View>
      <View style={[styles.statsContainer, bg]}>
        <View style={[styles.stat, bg]}>
          <View style={styles.statLabel}></View>
          <View style={styles.statValue}></View>
        </View>
        <View style={[styles.stat, bg]}>
          <View style={styles.statLabel}></View>
          <View style={styles.statValue}></View>
        </View>
        <View style={[styles.stat]}>
          <View style={styles.statLabel}></View>
          <View style={styles.statValue}></View>
        </View>
      </View>
      <View style={[styles.button, bg]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    width: "90%",
    margin: "auto",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e6e3e3",
  },
  ownerName: {
    height: 16,
    width: 100,
  },
  repoName: {
    height: 18,
    marginBottom: 8,
    width: 180,
    backgroundColor: "#e6e3e3",
  },
  description: {
    height: 14,
    marginBottom: 12,
    width: 220,
    backgroundColor: "#e6e3e3",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#e6e3e3",
  },
  stat: {
    flexDirection: "row",
  },
  statLabel: {
    height: 10,
    width: 60,
    marginBottom: 4,
    // backgroundColor:"#e6e3e3"
  },
  statValue: {
    height: 10,
    width: 40,
    marginLeft: 4,
  },
  button: {
    height: 40,
    backgroundColor: "#e6e3e3",
    borderRadius: 5,
  },
});

export default RepoOverviewSkeleton;
