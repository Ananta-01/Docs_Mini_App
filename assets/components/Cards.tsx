import * as React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Card, Text,Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const subjects = [
  { id: 1, name: 'Card 1' },
  { id: 2, name: 'Card 2' },
  { id: 3, name: 'Card 3' },
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
        <Card key={subject.id} style={{
          marginTop: cardGap,
          marginLeft: i % 2 !== 0 ? cardGap : 0,
          width: cardWidth,
          height: 180,
          backgroundColor: 'white',
          borderRadius: 16,
          shadowOpacity: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
         <Icon size={24} color="black" name="file-alt" />
          <Card.Content>
            <Text variant="titleLarge">Card title {subject.name}</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  </>
);

export default Cards;
