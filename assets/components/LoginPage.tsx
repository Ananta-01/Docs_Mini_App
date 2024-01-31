import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [badEmail, setBadEmail] = useState<Boolean>(false);
  const [badPassword, setBadPassword] = useState<Boolean>(false);

  const validate = () => {
    let valid = true;
    if (email == '') {
      setBadEmail(true);
      valid = false;
    } else if (email != '') {
      setBadEmail(false);
    }
    if (password == '') {
      setBadPassword(true);
      valid = false;
    } else if (password != '') {
      setBadPassword(false);
    }
    return valid;
  };
  const login = async () => {
    const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer actual_token_value_here');

const body = { email: email, password: password };

try {
  const res = await fetch('https://docs-mini-app-server.onrender.com/api/auth/login', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(body),
  });

  // Continue with parsing the response
  const data = await res.json();
  console.log('Response Data:', data);
} catch (error) {
  console.error('Error:', error);
  // Handle the error appropriately
}
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
          />
          {badEmail && <Text style={styles.ErrorText}>Please Enter Email</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={txt => setPassword(txt)}
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
          {badPassword && (
            <Text style={styles.ErrorText}>Please Enter Password</Text>
          )}
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            if (validate()) {
              login();
            }
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or, login with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}></TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            {/* Social Media Icon */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            {/* Social Media Icon */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>
          New to the app? <Text style={styles.registerText}>Register</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#AD40AF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#AD40AF',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#AD40AF',
    fontSize: 14,
    fontWeight: '700',
  },
  ErrorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
