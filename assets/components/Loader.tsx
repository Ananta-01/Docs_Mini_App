import React from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
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
<View style={{width:80,height:80,borderRadius:10,justifyContent:'center',alignItems: 'center'}}>
    <ActivityIndicator size={'large'} color={'black'}/>
</View>

        </View>
    </Modal>
  );
};
