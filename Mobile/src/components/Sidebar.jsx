import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../firebase/auth';
import Search from './Search';

const Sidebar = () => {
  const navigation = useNavigation();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleLogout = async () => {
    navigation.navigate('Login');
    await logout();
  };

  const handleSearch = () => {
    setOpenSearchModal(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <MaterialCommunityIcons name="home-heart-outline" size={30} color="white" />
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity onPress={handleSearch}>
        <MaterialIcons name="search" size={30} color="white" />
      </TouchableOpacity>
      
      {/* Notifications Icon */}
      <Ionicons name="notifications-outline" size={30} color="white" />
      
      {/* Add Icon */}
      <FontAwesome name="plus-circle" size={30} color="white" />
      
      {/* User Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <FontAwesome name="user" size={30} color="white" />
      </TouchableOpacity>
      
      {/* Logout Icon */}
      <TouchableOpacity onPress={handleLogout}>
        <Feather name="log-out" size={30} color="white" />
      </TouchableOpacity>

      <Search isOpen={openSearchModal} onClose={() => setOpenSearchModal(false)} />
    </View>
  );
};

export default Sidebar;