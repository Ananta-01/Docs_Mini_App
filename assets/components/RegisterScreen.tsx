import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import RegistrationSVG from '../assets/images/misc/registration.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
// import CustomButton from '../components/CustomButton';

const InputField = ({ label, icon, keyboardType = 'default', inputType = 'text' }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 8,
        }}>
        {icon}
        <TextInput
          style={{ flex: 1, color: '#666', marginLeft: 5 }}
          placeholder={label}
          keyboardType={keyboardType}
          secureTextEntry={inputType === 'password'}
        />
      </View>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          {/* <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          /> */}
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        {/* Social Media Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#4285F4',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <GoogleSVG height={24} width={24} style={{ marginRight: 10 }} /> */}
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#3b5998',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <FacebookSVG height={24} width={24} style={{ marginRight: 10 }} /> */}
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#00acee',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <TwitterSVG height={24} width={24} style={{ marginRight: 10 }} /> */}
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Twitter</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        {/* Input Fields */}
        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        {/* Register Button */}
        {/* <CustomButton label={'Register'} onPress={() => {}} /> */}

        {/* Already registered? Login */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;