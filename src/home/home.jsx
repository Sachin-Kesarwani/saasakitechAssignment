import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../shared/customInput";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import RepoCardList from "../shared/repoCardList";
import { GlobalContext } from "../constatnts/context";
import { SET_REPO_LISTS, SET_THEME } from "../constatnts/actionType";
import { View } from "react-native";
import CustomStatusBar from "../shared/customStatusBar";
import Icon from "../shared/icon";
import { darkTheme, lightTheme, themestyles } from "../theme";

function HomeScreen(props) {
  const { navigation } = props;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setrefreshing] = useState(false);
  const per_page = 5;
  const { state, stateDispatch } = useContext(GlobalContext);
  const { allRepos = [], isDarkMode = false } = state;
  const theme = themestyles(isDarkMode);

  const getRepositories = useCallback(async (searchText) => {
    try {
      setLoading(true);
      setIsError(false);
      stateDispatch({ type: SET_REPO_LISTS, data: [] });
      const data = await fetch(
        `https://api.github.com/search/repositories?q=${searchText}&page=${1}&per_page=${per_page}`
      );
      const jsonData = await data.json();
      const { items = [] } = jsonData;
      setPage(2);
      stateDispatch({ type: SET_REPO_LISTS, data: items });
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
      setrefreshing(false);
    }
  }, []);
  const debounce = useDebounce(getRepositories, 500);
  useEffect(() => {
    if (text.length > 0) {
      debounce(text);
    } else {
      stateDispatch({ type: SET_REPO_LISTS, data: [] });
    }
  }, [text]);

  async function onLoadmorefun() {
    try {
      setLoading(true);
      setIsError(false);
      const data = await fetch(
        `https://api.github.com/search/repositories?q=${text}&page=${page}&per_page=${per_page}`
      );
      const jsonData = await data.json();
      const { items = [] } = jsonData;
      setPage((prev) => prev + 1);
      stateDispatch({ type: SET_REPO_LISTS, data: [...allRepos, ...items] });
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }
  function onRefreshfunction() {
    setrefreshing(true);
    getRepositories(text);
  }
  return (
    <SafeAreaView>
      <CustomStatusBar
        backgroundColor={
          isDarkMode ? darkTheme.backgroundColor : lightTheme.backgroundColor
        }
      />
      <View style={[styles.container, theme.container, theme.text]}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.themeChangeButton}
            onPress={() =>
              stateDispatch({ type: SET_THEME, data: !isDarkMode })
            }
          >
            <Icon iconType={isDarkMode ? "lightMode" : "darkMode"} size={20} />
          </TouchableOpacity>
        </View>

        <CustomInput
          placeholder={"Please Enter name of Repository"}
          value={text}
          onChangeText={setText}
          isDarkMode={isDarkMode}
        />

        {text?.length > 0 ? (
          <RepoCardList
            repoLists={allRepos}
            loading={loading}
            noResultMessage={`Sorry, we couldn't find any results for your search.`}
            noMoreResultMessage="All done! No more results available."
            errorMessage={"Something went wrong. Please try again."}
            onLoadmorefun={onLoadmorefun}
            navigation={navigation}
            isError={isError}
            onRefreshfunction={onRefreshfunction}
            refreshing={refreshing}
            shouldRefresh={true}
          />
        ) : (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/home_page_image.png")}
            />
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Explore Repositories</Text>
              <Text style={styles.subText}>
                Use the search bar above to explore a variety of repositories.
                Discover the ones that interest you and add them to your
                favorites!
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "auto",
    height: 340,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  themeChangeButton: {
    marginRight: 20,
    padding: 6,
    flex: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
