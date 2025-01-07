import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./home";
import RepoDetailPage from "../shared/repoDetails";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="repoDetails" component={RepoDetailPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
