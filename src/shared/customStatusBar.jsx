import React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const CustomStatusBar = ({
  backgroundColor = "white",
  translucent = false,
}) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      barStyle="dark-content"
      translucent={translucent}
      backgroundColor={backgroundColor}
    />
  ) : null;
};

export default CustomStatusBar;
