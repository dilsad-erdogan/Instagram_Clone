import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../public/insta_logo.png";
import GoogleIcon from "../../public/google.png";
import PlayStore from "../../public/microsoft.png";
import Microsoft from "../../public/playstore.png";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // const user = await login(email, password);
    // if(user) {
    //   navigation.navigate('Main');
    // }
    navigation.navigate('Main');
  };

  const hangleGoogleLogin = async () => {};

  const handleRegister = () => {
    navigation.navigate('Register');
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
            {/* Email Input */}
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#fff" keyboardType="email-address" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />

            {/* Password Input */}
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />

            {/* Submit Button */}
            <TouchableOpacity onPress={handleLogin} className="bg-blue-400 disabled:bg-blue-200 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2">
              <Text className="text-white font-bold">Login</Text>
            </TouchableOpacity>
          </View>

          {/* Or */}
          <View className="flex items-center w-full mb-5">
            <Text className="mx-4 text-gray-300">OR</Text>
          </View>

          {/* Login Google */}
          <View className="flex flex-row justify-center items-center p-4 gap-5">
            <Image source={GoogleIcon} alt="Logo" className="max-h-6 max-w-6" />
            <Text onPress={hangleGoogleLogin} className="text-blue-400">Log in with Google</Text>
          </View>
        </View>

        {/* Change Form */}
        <View className="flex gap-4 justify-center items-center p-5 border border-gray-500 rounded-lg mb-5 max-w-[450px] w-screen">
          <Text className='text-white'>Don&apos;t have an account?</Text>
          <Text className="text-blue-400" onPress={handleRegister}>Sign Up</Text>
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
  );
};

export default Login;