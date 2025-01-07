import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "./customStatusBar";
import AddToFavorite from "./addToFavorite";
import Icon from "./icon";
import { GlobalContext } from "../constatnts/context";
import { darkTheme, lightTheme, themestyles } from "../theme";

const RepoDetailPage = (props) => {
  const { navigation, route } = props;
  const { repo = {} } = route.params;
  const {
    full_name = "",
    description = "",
    owner = {},
    html_url = "",
    stargazers_count = 0,
    forks_count = 0,
    open_issues_count = 0,
    license = {},
    topics = [],
    language = "",
    created_at = "",
    updated_at = "",
    homepage = "",
  } = repo;
  const { state,  } = useContext(GlobalContext);
  const {  isDarkMode=false} = state;
  const theme = themestyles(isDarkMode);
  const bg =  {backgroundColor:isDarkMode?"#645573":"#9142db"}
  const handleVisitRepo = () => {
    Linking.openURL(html_url);
  };

  return (
    <SafeAreaView>
      <CustomStatusBar backgroundColor={isDarkMode?darkTheme.backgroundColor:lightTheme.backgroundColor}/>
      <View style={[styles.container , theme.container , theme.text]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image source={{ uri: owner.avatar_url }} style={styles.avatar} />
          </View>
          <Text style={styles.repoName}>{full_name}</Text>
          <Text style={styles.repoDescription}>{description}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statsLabel}>Stars</Text>
              <Text style={styles.statsValue}>{stargazers_count}</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsLabel}>Forks</Text>
              <Text style={styles.statsValue}>{forks_count}</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsLabel}>Issues</Text>
              <Text style={styles.statsValue}>{open_issues_count}</Text>
            </View>
          </View>
          <Text style={styles.language}>
            <Text style={[styles.language, { fontWeight: "800" }]}>
              Language:
            </Text>{" "}
            {language || "NA"}
          </Text>
          <Text style={styles.topics}>
            <Text style={[styles.language, { fontWeight: "800" }]}>
              Topics:
            </Text>{" "}
            {topics?.join(", ") || "NA"}
          </Text>
          <Text style={styles.license}>
            <Text style={[styles.language, { fontWeight: "800" }]}>
              License:
            </Text>{" "}
            {license?.name || "NA"}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Created on: {new Date(created_at).toLocaleDateString()}
            </Text>
            <Text style={styles.footerText}>
              Last updated: {new Date(updated_at).toLocaleDateString()}
            </Text>
            {homepage && (
              <TouchableOpacity
                onPress={() => Linking.openURL(homepage)}
                style={[styles.linkButton , bg , {marginBottom:0}]}
              >
                <Text style={styles.linkText}>Visit Website</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleVisitRepo}
              style={[styles.linkButton , bg]}
            >
              <Text style={styles.linkText}>Visit Repository</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    height: "100%",
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: "white",
  },
  repoInfo: {
    justifyContent: "center",
  },
  repoName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  repoDescription: {
    fontSize: 16,
    color: "#555",
    width: "100%",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statsItem: {
    alignItems: "center",
  },
  statsLabel: {
    fontSize: 14,
    color: "#777",
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  language: {
    fontSize: 16,
    color: "#444",
    marginVertical: 5,
  },
  topics: {
    fontSize: 16,
    color: "#444",
    marginVertical: 5,
  },
  license: {
    fontSize: 16,
    color: "#444",
    marginVertical: 5,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  linkButton: {
    backgroundColor: "#e680ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:30,
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RepoDetailPage;
