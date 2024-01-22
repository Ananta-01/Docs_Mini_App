import React, { useRef } from "react";
import { Dimensions, ScrollView, View, PanResponder, Animated, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Cards() {
  const subjects = [
    { id: 1, name: 'Card 1', footer: '4mb' },
    { id: 2, name: 'Card 2' },
    { id: 3, name: 'Card 3', footer: '4mb' },
    { id: 4, name: 'Card 4' },
  ];

  const cardRefs = useRef(subjects.map(() => React.createRef()));
  const panValues = useRef(subjects.map(() => new Animated.ValueXY()));

  const createPanResponder = (index) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: panValues.current[index].x, dy: panValues.current[index].y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(panValues.current[index], {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    });
  };



  const cardGap = 16;

  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {subjects.map((subject, i) => (
        <Animated.View
          key={subject.id}
          style={[
            { transform: [{ translateX: panValues.current[i].x }, { translateY: panValues.current[i].y }] },
          ]}
          {...createPanResponder(i).panHandlers}
        >
          <View
            ref={cardRefs.current[i]}
            style={{
              marginTop: cardGap,
              marginLeft: i % 2 !== 0 ? cardGap : 0,
              width: cardWidth,
              height: 150,
              backgroundColor: 'rgba(0, 0, 0, 0.4);',
              borderRadius: 16,
              shadowOpacity: 0.2,
              position: 'relative',
            }}>
            <View style={{ margin: 8 }}>
              <Icon size={24} color="white" name="file-alt" />
              <Text variant="titleMedium" style={{ color: 'white', }} >Card title {subject.name}</Text>
              <Text variant="labelSmall" style={{ color: 'white', }} >Lorem ipsum dolor sit amet, consectetur adipisicing.</Text>
            </View>

            {subject.footer ? <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              backgroundColor: '#92C7CF',
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 10 }}> {subject.footer} </Text>
            </View> : ''}
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

// Updated card style
const styles = StyleSheet.create({

});


export default Cards;
