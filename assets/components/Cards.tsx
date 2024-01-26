import React, { useRef, useState } from 'react';

import {
  Dimensions,
  ScrollView,
  View,
  PanResponder,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Modal, Portal, Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Cards() {
  const [visible, setVisible] = React.useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [editInput, setEditInput] = useState(true);
  const showModal = (data: any) => {
    setSelectedCardData(data);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedCardData(null);
    setVisible(false);
  };
  const subjects = [
    { id: 1, name: 'Card 1', footer: '4mb' },
    { id: 2, name: 'Card 1', footer: '' },
    { id: 3, name: 'Card 1', footer: '' },

    { id: 4, name: 'Card 1', footer: '4mb' },

    { id: 5, name: 'Card 1', footer: '' },
    { id: 6, name: 'Card 1', footer: '4mb' },
    { id: 7, name: 'Card 1', footer: '4mb' },



  ];

  const cardRefs = useRef(subjects.map(() => React.createRef()));
  const panValues = useRef(subjects.map(() => new Animated.ValueXY()));

  const createPanResponder = (index: any) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: panValues.current[index].x, dy: panValues.current[index].y },
        ],
        {
          useNativeDriver: false,
        }
      ),
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
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {subjects.map((subject, i) => (
        <Animated.View

          key={subject.id}
          style={[
            {
              transform: [
                { translateX: panValues.current[i].x },
                { translateY: panValues.current[i].y },
              ],
            },
          ]}
          {...createPanResponder(i).panHandlers}>
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
            <TouchableOpacity style={{ margin: 8 }} onPress={() => showModal(subject)}  >
              <Icon size={24} color="white" name="file-alt" />
              <Text variant="titleMedium" style={{ color: 'white' }}>
                Card title {subject.name}
              </Text>
              <Text variant="labelSmall" style={{ color: 'white' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </Text>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                  {selectedCardData && (
                    <>
                      <TouchableOpacity onPress={hideModal} style={styles.editIcon}>
                        <Icon size={24} color="black" name="times-circle" />

                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEditInput(false)} style={styles.editIcon2}>

                        <Icon size={24} color="black" name="edit" />
                      </TouchableOpacity>
                      {editInput ? <ScrollView style={styles.scrollView}>
                        
                        <Text style={styles.cardTitle}>{selectedCardData.name}</Text>
                        <Text style={styles.cardText}>
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit totam ipsum, ipsa minima enim, repudiandae saepe placeat dolores nisi maiores molestias labore ipsam minus, nesciunt autem facere voluptates architecto veniam molestiae voluptatem blanditiis? Blanditiis quis ut, obcaecati eius reprehenderit exercitationem mollitia quisquam, rerum delectus adipisci, cupiditate incidunt soluta repudiandae suscipit error temporibus sapiente molestias aut consectetur! Recusandae perferendis vel tenetur magni, reprehenderit iste est rem nesciunt sit quod beatae velit debitis consequatur quo. Molestiae illum fugit excepturi saepe, deserunt amet debitis esse, voluptatibus consectetur, temporibus error obcaecati eos sapiente sunt nihil praesentium molestias magni minus modi fuga. Ipsum rerum repudiandae doloremque natus culpa distinctio enim vero id atque, modi dolorum repellat similique beatae, quos quae. Est officiis, saepe provident ad earum, illum ea, libero dolorem necessitatibus ut qui hic. Sapiente reprehenderit nam maxime repellendus natus nemo atque doloribus ipsum. Earum, unde fugiat. Ullam hic dolor nostrum autem! Autem deserunt explicabo, quibusdam alias atque qui ipsum! Perspiciatis ab alias deleniti corporis earum facere numquam commodi blanditiis, quis incidunt soluta odit quibusdam pariatur saepe possimus sunt eos eius provident. Perferendis magnam odit totam iure ad velit omnis quam veniam, porro adipisci earum dignissimos itaque accusamus corrupti. Incidunt cum recusandae consectetur tempore quam ullam itaque hic soluta rerum deleniti exercitationem quae doloremque praesentium et, odio veniam doloribus maiores! Consequatur culpa nulla tenetur cum nemo mollitia, repudiandae alias voluptatem beatae blanditiis cumque aut quasi, iste voluptatum explicabo odio accusamus magnam adipisci neque! Veniam rem, ab quaerat doloribus voluptate illo. Sequi mollitia voluptatibus, maiores corporis numquam animi tenetur molestiae amet vero. Quam voluptatem eum harum earum voluptatibus exercitationem doloremque sint fugiat iure ut, vero expedita similique. Dolores obcaecati incidunt beatae eligendi qui, ullam molestias enim accusamus, modi, magnam aspernatur. Quasi exercitationem harum recusandae doloribus odio fugit nemo laborum est, dicta, quibusdam magnam dolorum alias molestiae numquam voluptates ad ipsum fugiat excepturi voluptatum vitae deserunt nisi animi quis id? Et eos, commodi, at quas ullam dolores iusto modi expedita vero quibusdam animi! Dolorem, tenetur! Cumque nesciunt magni libero. Exercitationem reprehenderit incidunt nesciunt. Non ea praesentium odit ipsum in corporis, pariatur nesciunt quidem sint illum itaque odio veniam eius harum veritatis asperiores incidunt officiis ad nobis suscipit. Quo porro esse iste nisi, corrupti maiores aliquid distinctio placeat ipsum animi nam qui quas cum sequi dicta ullam deserunt pariatur rem, mollitia facere, excepturi praesentium. Error quia suscipit laborum vel nihil quasi est quisquam nemo velit accusantium! Neque esse officia, facilis quisquam magnam culpa atque nemo consectetur odit incidunt. Culpa nemo, itaque ea nobis numquam soluta praesentium, non, deserunt aperiam quis dolorem atque sapiente ipsum perferendis laudantium veritatis sunt eius incidunt sed facilis delectus exercitationem quas fugiat. Fugiat consectetur harum ea, doloremque maxime, similique provident libero deserunt possimus veniam quos reiciendis nisi, ipsam accusamus repellendus quis. Quo, non eaque tempore ullam quis veniam, et in reprehenderit blanditiis aperiam consectetur ipsa accusantium repellat. Doloribus eligendi aliquam, consequuntur excepturi laudantium molestiae nisi laborum explicabo neque aliquid ipsam quis alias sint ab soluta quasi voluptatem qui necessitatibus mollitia sequi eos officia? Dolor.
                        </Text>

                      </ScrollView> : <Text>Now you can edit this part OK.</Text>}
                      

                    </>
                  )}
                </Modal>
              </Portal>
            </TouchableOpacity>

            {subject.footer ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  backgroundColor: '#92C7CF',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 10 }}> {subject.footer} </Text>
              </View>
            ) : (
              ''
            )}
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

// Updated card style
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: "80%", // Adjusted height for better visibility of the ScrollView
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the icon appears above the ScrollView content
  },
  editIcon2: {
    position: 'absolute',
    top: 10,
    right: 40,
    zIndex: 1, // Ensure the icon appears above the ScrollView content
  },
  scrollView: {
    marginTop: 20,
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  cardText: {
    color: 'black',
    marginBottom: 15,
  },

});
export default Cards;