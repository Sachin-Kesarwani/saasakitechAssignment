import React from 'react'
import { View } from 'react-native'
import { Ionicons } from 'react-native-vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const Icon = (props) => {
  const {iconType , color , size } = props;
  const getIcon=()=>{
    const allIcons={
      home: <Ionicons name={"home"} color={color} size={size} />,
      favourite:<MaterialIcons name="favorite" color={color} size={size}/>,
      disfavored:<MaterialIcons name="favorite-border"  color={color} size={size}/>,
      close:<AntDesign name="close" color={color} size={size} />,
      dotIcon:<Entypo name="dot-single"color={color} size={size}/>,
      darkMode:<MaterialIcons name="dark-mode"color={color} size={size} />,
      lightMode:<MaterialIcons name="light-mode" color={color} size={size}  />

    }
    return allIcons[iconType]
  }
  return (
    <View>{getIcon()}</View>
  )
}

export default Icon;
