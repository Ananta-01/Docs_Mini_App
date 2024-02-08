import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  PanResponder,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Modal,
  Portal,
  Card,
  Text,
  Button,
  TextInput,
  FAB,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Loader} from './Loader';

function Cards({userId}: any) {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: any) => setState({open});

  const {open} = state;

  const [visible, setVisible] = React.useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [editInput, setEditInput] = useState(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [noteData, setNoteData] = useState();

  const showModal = (data: any) => {
    setSelectedCardData(data);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedCardData(null);
    setVisible(false);
  };

  function hideModaleditInput() {
    setSelectedCardData(null);
    setVisible(false);
    setEditInput(false);
  }
  // const subjects = [
  //   {id: 1, name: 'Card 1', footer: '4mb'},
  //   {id: 2, name: 'Card 1', footer: ''},
  //   {id: 3, name: 'Card 1', footer: ''},

  //   {id: 4, name: 'Card 1', footer: '4mb'},

  //   {id: 5, name: 'Card 1', footer: ''},
  //   {id: 6, name: 'Card 1', footer: '4mb'},
  //   {id: 7, name: 'Card 1', footer: '4mb'},
  // ];

  // const cardRefs = useRef(noteData.map(() => React.createRef()));
  // const panValues = useRef(noteData.map(() => new Animated.ValueXY()));
  const cardRefs = useRef([]);
  const panValues = useRef([]);

  if (noteData) {
    cardRefs.current = noteData.map(() => React.createRef());
    panValues.current = noteData.map(() => new Animated.ValueXY());
  }

  const createPanResponder = (index: any) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {dx: panValues.current[index].x, dy: panValues.current[index].y},
        ],
        {
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: () => {
        Animated.spring(panValues.current[index], {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    });
  };

  const cardGap = 16;

  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://docs-mini-app-server.onrender.com/api/notes/getNotes/${userId}`,
        {
          method: 'GET',
        },
      );

      const data = await res.json();
      setNoteData(data);
      setLoading(false);
      console.log('Response Data:', data);
      // console.log(noteData);
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
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: 780,
      }}>
      {noteData?.map((noteData: any, i: any) => (
        <Animated.View
          key={noteData.postedBy}
          style={[
            {
              transform: [
                {translateX: panValues.current[i].x},
                {translateY: panValues.current[i].y},
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
            <TouchableOpacity
              style={{margin: 8}}
              onPress={() => showModal(noteData)}>
              <Icon size={24} color="white" name="file-alt" />
              <Text variant="titleMedium" style={{color: 'white'}}>
                {noteData.title}
              </Text>
              <Text variant="labelSmall" style={{color: 'white'}}>
                {noteData.description}
              </Text>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModaleditInput}
                  contentContainerStyle={styles.containerStyle}>
                  {selectedCardData && (
                    <>
                      <TouchableOpacity
                        onPress={hideModaleditInput}
                        style={styles.editIcon}>
                        <Icon size={24} color="black" name="times-circle" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setEditInput(true)}
                        style={styles.editIcon2}>
                        <Icon size={24} color="black" name="edit" />
                      </TouchableOpacity>
                      {editInput ? (
                        <ScrollView style={styles.scrollView}>
                          <TextInput
                            style={{marginTop: 10, marginBottom: 10}}
                            label="Title"
                            value={selectedCardData.title}
                            mode="outlined"
                          />
                          <TextInput
                            multiline
                            numberOfLines={10}
                            style={{marginTop: 10, marginBottom: 10}}
                            label="description"
                            value={selectedCardData.description}
                            mode="outlined"
                          />
                          <TouchableOpacity style={styles.changesButton}>
                            <Text style={styles.changesButtonText}>
                              Save changes
                            </Text>
                          </TouchableOpacity>
                        </ScrollView>
                      ) : (
                        <ScrollView style={styles.scrollView}>
                          <Text style={styles.cardTitle}>
                            {selectedCardData.title} 
                          </Text>
                          <Text style={styles.cardText}>
                            {selectedCardData.description}
                          </Text>
                        </ScrollView>
                      )}
                    </>
                  )}
                </Modal>
              </Portal>
            </TouchableOpacity>

            {/* {subject.footer ? (
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
                <Text style={{fontSize: 10}}> {subject.footer} </Text>
              </View>
            ) : (
              ''
            )} */}
          </View>
        </Animated.View>
      ))}
      <FAB.Group
        // fabStyle={styles.fab}
        theme={{colors: {background: 'rgba(33, 33, 33, 0.06)'}}}
        open={open}
        visible
        icon={open ? 'note' : 'plus'}
        actions={[
          {icon: 'plus', onPress: () => console.log('Pressed add')},
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
      <Loader visible={loading} />
    </View>
  );
}

// Updated card style
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: '80%', // Adjusted height for better visibility of the ScrollView
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  changesButton: {
    backgroundColor: '#265073',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  changesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    backgroundColor: '#333366"',
    color: '#333366"',
  },
});
export default Cards;
