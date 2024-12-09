import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../public/insta_logo.png";
import PlayStore from "../../public/microsoft.png";
import Microsoft from "../../public/playstore.png";

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {};

  const handleLogin = async () => {
    navigation.navigate('Login');
  };

  return (
    <View className="bg-black h-full flex justify-center items-center">
      <View className="flex-1 flex-col m-5 flex justify-center items-center">
        {/* Login Form */}
        <View className="flex flex-col justify-center items-center p-5 border border-gray-500 rounded-lg mb-5 max-w-[450px] w-full">
          {/* Logo */}
          <Image source={Logo} alt="Logo" className="m-5" />

          {/* Form */}
          <View className="flex flex-col gap-5 p-5 w-screen mb-5">
            <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#fff" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#fff" keyboardType="email-address" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />

            {/* Submit Button */}
            <TouchableOpacity onPress={handleLogin} className="bg-blue-400 disabled:bg-blue-200 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2">
              <Text className="text-white font-bold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Form */}
        <View className="flex gap-4 justify-center items-center p-5 border border-gray-500 rounded-lg mb-5 max-w-[450px] w-screen">
          <Text className='text-white'>Do you have an account?</Text>
          <Text className="text-blue-400" onPress={handleLogin}>Login</Text>
        </View>

        {/* Text */}
        <View className="flex justify-center mb-5">
          <Text className='text-white'>Get the app.</Text>    
        </View>

        {/* Google or Microsoft */}
        <View className="flex flex-row justify-center items-center gap-5">
          <Image source={PlayStore} alt="PlayStore" className="max-w-40 max-h-10" />
          <Image source={Microsoft} alt="Microsoft" className="max-w-40 max-h-10" />
        </View>
      </View>
    </View>
  )
}

export default Register