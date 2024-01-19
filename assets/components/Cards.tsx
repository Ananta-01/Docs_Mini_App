import * as React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const subjects = [
  { id: 1, name: 'Card 1', footer: '4mb' },
  { id: 2, name: 'Card 2' },
  { id: 3, name: 'Card 3', footer: '4mb' },
  { id: 4, name: 'Card 4' },
];

const cardGap = 16;

const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const Cards = () => (
  <>
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {subjects.map((subject, i) => (
        <View key={subject.id} style={{
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

      ))}
    </View>
  </>
);

export default Cards;
