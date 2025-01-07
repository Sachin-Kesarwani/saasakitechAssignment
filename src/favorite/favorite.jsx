import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../constatnts/context";
import RepoCardList from "../shared/repoCardList";
import CustomStatusBar from "../shared/customStatusBar";
import { darkTheme, lightTheme, themestyles } from "../theme";

const Favorite = (props) => {
  const { navigation } = props;
  const { state } = useContext(GlobalContext);
  const { favoritRepos = [], isDarkMode } = state;
  const theme = themestyles(isDarkMode);
  return (
    <SafeAreaView>
      <CustomStatusBar
        backgroundColor={
          isDarkMode ? darkTheme.backgroundColor : lightTheme.backgroundColor
        }
      />
      <View style={[styles.container, theme.container, theme.text]}>
        <RepoCardList
          repoLists={favoritRepos}
          noResultMessage={`Your favorites list is empty. Start exploring and add repositories you love!`}
          noMoreResultMessage="All done! No more results available."
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
