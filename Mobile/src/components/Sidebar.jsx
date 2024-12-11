import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Sidebar = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Home Icon */}
      <MaterialCommunityIcons name="home-heart-outline" size={30} color="white" />
      
      {/* Search Icon */}
      <MaterialIcons name="search" size={30} color="white" />
      
      {/* Notifications Icon */}
      <Ionicons name="notifications-outline" size={30} color="white" />
      
      {/* Add Icon */}
      <FontAwesome name="plus-circle" size={30} color="white" />
      
      {/* User Icon */}
      <FontAwesome name="user" size={30} color="white" />
      
      {/* Logout Icon */}
      <Feather name="log-out" size={30} color="white" />
    </View>
  );
};

export default Sidebar;