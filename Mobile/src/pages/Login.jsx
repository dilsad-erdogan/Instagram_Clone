import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../public/insta_logo.png";
import PlayStore from "../../public/microsoft.png";
import Microsoft from "../../public/playstore.png";
import { login } from '../firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = await login(email, password);
    if(user) {
      console.log("Logged in user:", user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('Main');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Login Form */}
        <View style={styles.loginForm}>
          {/* Logo */}
          <Image source={Logo} style={styles.logo} />

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#fff" keyboardType="email-address" style={styles.input} />

            {/* Password Input */}
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} style={styles.input} />

            {/* Submit Button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Form */}
        <View style={styles.changeForm}>
          <Text style={styles.whiteText}>Don't have an account?</Text>
          <Text style={styles.linkText} onPress={handleRegister}>Sign Up</Text>
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>Get the app.</Text>
        </View>

        {/* Google or Microsoft */}
        <View style={styles.appIcons}>
          <Image source={PlayStore} style={styles.storeIcon} />
          <Image source={Microsoft} style={styles.storeIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    maxWidth: 450,
    width: '100%',
  },
  logo: {
    margin: 20,
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    color: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changeForm: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 20,
    maxWidth: 450,
    width: '100%',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
  },
  linkText: {
    color: 'blue',
  },
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  appIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  storeIcon: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Login;