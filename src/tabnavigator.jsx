import * as React from "react";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "./shared/icon";
import HomeStack from "./home";
import FavoriteStack from "./favorite";
import {
  REMOVE_REPO_FROM_FAVORITE,
  SET_REPO_IN_FAVORITE,
  SET_REPO_LISTS,
  SET_THEME,
} from "./constatnts/actionType";
import { GlobalContext } from "./constatnts/context";
import { darkTheme } from "./theme";


const Tab = createBottomTabNavigator();
function useReducer(state, action) {
  switch (action.type) {
    case SET_REPO_IN_FAVORITE: {
      return {
        ...state,
        favoritRepos: [...state.favoritRepos,{... action.data  ,  isfavorite: true}],
        allRepos: state.allRepos.map((item) =>{
          return item.node_id === action.data.node_id ? { ...item, isfavorite: true } : item}
        ),
      };
    }
    case SET_REPO_LISTS: {
      return {
        ...state,
        allRepos: action.data,
      };
    }
    case REMOVE_REPO_FROM_FAVORITE: {
      return {
        ...state,
        favoritRepos: state.favoritRepos.filter(
          (item) => item.node_id !== action.data
        ),
        allRepos: state.allRepos.map((item) =>
          item.node_id == action.data ? { ...item, isfavorite: false } : item
        ),
      };
    }
    case SET_THEME:{
      return {
        ...state,isDarkMode:action.data
      }
    }
    default: {
      return state;
    }
  }
}
export default function TabNavigator() {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const inidata = {
    favoritRepos: [],
    allRepos: [],
    isDarkMode:false
  };
  const [state, stateDispatch] = React.useReducer(useReducer ,inidata);
  const {isDarkMode} = state
  React.useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const tabLists = [
    { name: "Home", iconType: "home", iconSize: 20, component: HomeStack },
    {
      name: "Favorites",
      iconType: "favourite",
      iconSize: 20,
      component: FavoriteStack,
    },
  ];

  return (
    <GlobalContext.Provider value={{ state, stateDispatch }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: true,
              tabBarActiveTintColor: "#9142db",
              tabBarInactiveTintColor: "#808080",
              tabBarStyle: {
                position: "absolute",
                backgroundColor:isDarkMode?darkTheme.backgroundColor:"#fff",
                bottom: keyboardVisible ? 0 : 0,
                transform: [
                  {
                    translateY: keyboardVisible ? 60 : 0,
                  },
                ],
              },
            }}
          >
            {tabLists.map((item, index) => {
              const { name, iconType, component, iconSize } = item;
              return (
                <Tab.Screen
                  key={index.toString()}
                  name={name}
                  component={component}
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Icon iconType={iconType} size={iconSize} color={color} />
                    ),
                  }}
                />
              );
            })}
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </GlobalContext.Provider>
  );
}
