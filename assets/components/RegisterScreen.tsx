import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Button, Dialog, Portal} from 'react-native-paper';
import {Loader} from './Loader';

const InputField = ({
  label,
  icon,
  keyboardType = 'default',
  inputType = 'text',
  value,
  onChangeText,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <FeatherIcon
        name={icon}
        style={styles.inputIcon}
        size={20}
        color="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#ddd"
        keyboardType={keyboardType}
        secureTextEntry={inputType === 'password'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);

  const validate = () => {
    if (name === '') {
      showDialog('Please Enter Name');
      return false;
    }
    if (email === '') {
      showDialog('Please Enter Email');
      return false;
    }
    if (!validateEmail(email)) {
      showDialog('Please Enter a Valid Email');
      return false;
    }
    if (password === '') {
      showDialog('Please Enter Password');
      return false;
    }
    return true;
  };

  const showDialog = (message: string) => {
    setDialogMessage(message);
    setVisibleDialog(true);
  };

  const hideDialog = () => {
    setVisibleDialog(false);
  };

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const register = async () => {
    setLoading(true);
    if (!validate()) {
      return; // If validation fails, do not proceed with registration
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer actual_token_value_here');

    const body = {name: name, email: email, password: password};

    try {
      const res = await fetch(
        'https://docs-mini-app-server.onrender.com/api/auth/reqister',
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify(body),
        },
      );

      // Continue with parsing the response
      const data = await res.json();
      setLoading(false);
      console.log('Response Data:', data);

      if (data._id != null) {
        navigation.navigate('Login', {id: data.id});
      } else if (data.error && data.error.includes('duplicate key error')) {
        // Check if the error message indicates duplicate email
        showDialog('Email already exists. Try a different email.');
      } else {
        Alert.alert('Register Failed', 'Try Different Email');
      }
    } catch (error: any) {
      if (error.message.includes('Unauthorized')) {
        Alert.alert(
          'Authentication Failed',
          'Invalid credentials. Please try again.',
        );
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>
      <View style={styles.formContainer}>
        <InputField
          label="Enter your name"
          icon="user"
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <InputField
          label="Email"
          icon="mail"
          keyboardType="email-address"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <InputField
          label="Password"
          icon="lock"
          inputType="password"
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        {visibleDialog && (
          <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
              <Dialog.Content>
                <Text variant="bodyMedium" style={styles.ErrorText}>
                  {dialogMessage}
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Understood</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            if (validate()) {
              register();
            }
          }}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.socialButtonsContainer}>
          {/* Social buttons */}
        </View>
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.goBack()}>
        <Text>
          Already have an account? <Text style={styles.loginText}>Log In</Text>
        </Text>
      </TouchableOpacity>
      <Loader visible={loading} />
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
  ErrorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
