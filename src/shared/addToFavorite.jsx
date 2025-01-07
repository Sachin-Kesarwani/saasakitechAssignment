import React, { memo, useContext } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "./icon";
import { GlobalContext } from "../constatnts/context";
import {
  REMOVE_REPO_FROM_FAVORITE,
  SET_REPO_IN_FAVORITE,
} from "../constatnts/actionType";

const AddToFavorite = (props) => {
  const { repository = {} } = props;
  const { node_id = "", isfavorite = false } = repository;
  const { stateDispatch } = useContext(GlobalContext);

  function actionOnFavorite() {
    if (isfavorite) {
      stateDispatch({ type: REMOVE_REPO_FROM_FAVORITE, data: node_id });
    } else {
      stateDispatch({ type: SET_REPO_IN_FAVORITE, data: repository });
    }
  }
  return (
    <TouchableOpacity onPress={actionOnFavorite}>
      <Icon iconType={isfavorite ? "favourite" : "disfavored"} size={24} />
    </TouchableOpacity>
  );
};

export default memo(AddToFavorite);
