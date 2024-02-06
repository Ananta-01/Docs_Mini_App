import React from 'react';
import {View, Text, Modal, ActivityIndicator, Image} from 'react-native';
import {Player} from '@lottiefiles/react-lottie-player';
import LottieView from 'lottie-react-native';
interface LoaderProps {
  visible: boolean;
}

export const Loader = ({visible}: LoaderProps) => {
  return (
    <Modal visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'black'} />
          {/* <Image autoPlay loop source={require('../Icons/Loading.gif')} /> */}
          {/* <LottieView
  source={{
    uri: 'https://lottie.host/1ae6e346-6f52-4a51-aee1-78dced906f61/x0hCPW6ZAF.json',
  }}
  autoPlay
  loop
/> */}
        </View>
      </View>
    </Modal>
  );
};
