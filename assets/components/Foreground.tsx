import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import Cards from './Cards';


function Foreground() {
    return (

        <SafeAreaView style={styles.container}>
        <ScrollView>
        <Cards />
        <Cards />
        <Cards />
        </ScrollView>
      </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        
       

    },


});

export default Foreground;
