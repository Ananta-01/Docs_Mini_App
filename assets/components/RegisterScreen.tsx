import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const InputField = ({ label, icon, keyboardType = 'default', inputType = 'text' }:any) => {
  return (
    <View style={styles.inputContainer}>
      <FeatherIcon name={icon} style={styles.inputIcon} size={20} color="#fff" />
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#ddd"
        keyboardType={keyboardType}
        secureTextEntry={inputType === 'password'}
      />
    </View>
  );
};

const RegisterScreen = ({ navigation }:any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField label="Enter your name" icon="user" />
        <InputField label="Email" icon="mail" keyboardType="email-address" />
        <InputField label="Password" icon="lock" inputType="password" />

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4267B2' }]}>
            <FontAwesomeIcon name="facebook" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#00acee' }]}>
            <FontAwesomeIcon name="twitter" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#db4a39' }]}>
            <FontAwesomeIcon name="google" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.footer} onPress={() => navigation.goBack()}>
        <Text>
          Already have an account? <Text style={styles.loginText}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2C3E50',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#34495E',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#5D6D7E',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#27AE60',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default RegisterScreen;
