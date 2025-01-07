import React, { memo, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AddToFavorite from "./addToFavorite";
import { GlobalContext } from "../constatnts/context";
import { themestyles } from "../theme";

const RepoOverviewCard = ({ repository  , navigation}) => {
  
  const { state, stateDispatch } = useContext(GlobalContext);
  const { allRepos = []  , isDarkMode=false} = state;
  const theme = themestyles(isDarkMode);
  const bg =  {backgroundColor:isDarkMode?"#645573":"#9142db"}

  return (
    <View style={[styles.card ,,theme.container , theme.text]}>
      <View style={styles.ownerContainer}>
        <View  style={styles.ownerContainer}>
        <Image
          source={{ uri: repository.owner.avatar_url }}
          style={styles.avatar}
        />
        <Text numberOfLines={2} style={styles.ownerName}>{repository.owner.login}</Text>
        </View>
      <AddToFavorite repository={repository} />
      </View>
      <Text style={styles.repoName}>{repository.full_name}</Text>
     { repository.description &&<Text numberOfLines={3} style={styles.description}>{repository.description}</Text>}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Stars:</Text>
          <Text style={styles.statValue}>{repository.stargazers_count}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Forks:</Text>
          <Text style={styles.statValue}>{repository.forks_count}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Language:</Text>
          <Text style={styles.statValue}>{repository.language || "N/A"}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('repoDetails', { repo: repository } )}
        style={[styles.button ,bg ]}
      >
        <Text style={styles.buttonText}>Open Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width:"90%",
    margin:"auto",
    padding: 16,
    marginBottom: 16,
    marginTop:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "bold",
    width:"75%"
  },
  repoName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 12,
  },
  statsContainer: {
    marginBottom: 16,
  },
  stat: {
    flexDirection: "row",
  },
  statLabel: {
    fontWeight: "bold",
    color: "#34495e",
  },
  statValue: {
    marginLeft: 4,
    color: "#7f8c8d",
  },
  button: {
    backgroundColor: "#e680ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default memo(RepoOverviewCard);
