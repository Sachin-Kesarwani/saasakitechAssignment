import React, { memo, useMemo } from "react";
import { Image, RefreshControl, StyleSheet, Text, View, VirtualizedList } from "react-native";
import RepoOverviewCard from "./repoOverviewCard";
import RepoOverviewSkeleton from "./skeletons/repoOverViewSkeleton";
import { ActivityIndicator } from "react-native";

const RepoCardList = (props) => {
  const {
    repoLists = [],
    loading = false,
    noResultMessage = "",
    noMoreResultMessage = "",
    isDataforLoadmore = false,
    isError = false,
    errorMessage = "",
    onLoadmorefun = () => {},
    navigation,
    onRefreshfunction=()=>{},
    refreshing=false,
    shouldRefresh=false
  } = props;

  if (isError) {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/error.jpg")}
        />
        <Text style={styles.noResultMessage}>{errorMessage}</Text>
      </View>
    );
  }
  const footerElement = () => {
    return (
      <View style={{ marginBottom: 190 }}>
        {loading && repoLists?.length === 0 ? (
          <View>
            <RepoOverviewSkeleton />
            <RepoOverviewSkeleton />
          </View>
        ) : loading && repoLists?.length > 0 ? (
          <ActivityIndicator color="#9142db" />
        ) : repoLists.length === 0 ? (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/empty_list.jpg")}
            />
            <Text style={styles.noResultMessage}>{noResultMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  };
  const memoizedFooterElement = useMemo(
    () => footerElement(),
    [
      loading,
      repoLists,
      isDataforLoadmore,
      noResultMessage,
      noMoreResultMessage,
    ]
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={repoLists}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item, index }) => (
          <RepoOverviewCard repository={item} navigation={navigation} />
        )}
        onEndReached={!loading && onLoadmorefun}
        onEndReachedThreshold={0.5}
        ListFooterComponent={memoizedFooterElement}
        refreshControl={
          shouldRefresh && <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshfunction}
            colors={['#9142db']}
            tintColor="#9142db"
            progressViewOffset={20}
          />
        }
      />
    </View>
  );
};

export default memo(RepoCardList);
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: "100%",
  },
  image: {
    width: 180,
    height: 150,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  noResultMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
