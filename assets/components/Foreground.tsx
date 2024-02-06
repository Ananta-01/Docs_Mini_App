import React, { useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, PanResponder, Animated } from 'react-native';
import Cards from "./Cards";


function Foreground({ userId}:any) {
    return (
        <SafeAreaView  style={styles.container}>
        <ScrollView>
        <Cards userId={userId} />
        
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
         backgroundColor: 'rgba(0, 0, 0, 0.1)',
         height : '100%',
        
       },
       

});

export default Foreground;
