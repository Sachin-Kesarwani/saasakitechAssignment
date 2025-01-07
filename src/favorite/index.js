import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Favorite from "./favorite";
import RepoDetailPage from "../shared/repoDetails";

const Stack = createNativeStackNavigator();
const FavoriteStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="home" component={Favorite} />
        <Stack.Screen name="repoDetails" component={RepoDetailPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default FavoriteStack;
