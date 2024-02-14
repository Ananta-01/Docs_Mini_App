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
import {TextInput as RNTextInput} from 'react-native';
import {
  Modal,
  Portal,
  Card,
  Text,
  Button,
  TextInput,
  FAB,
  Snackbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Loader} from './Loader';

function Cards({userId}: any) {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: any) => setState({open});
  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);

  const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar);

  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const {open} = state;
  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visibleAdd, setVisibleAdd] = React.useState(false);

  const [selectedCardData, setSelectedCardData] = useState(null);
  const [editInput, setEditInput] = useState(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [noteData, setNoteData] = useState();
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDesc, setNoteDesc] = useState<string>('');

  const showModalAdd = () => setVisibleAdd(true);
  const hideModalAdd = () => setVisibleAdd(false);

  const [updatenoteTitle, setUpdatenoteTitle] = useState<string>();
  const [updatenoteDesc, setUpdatenoteDesc] = useState<string>();

  const showModal = (data: any) => {
    setSelectedCardData(data);
    setVisible(true);
    setUpdatenoteTitle(data.title);
    setUpdatenoteDesc(data.description);
    setEditInput(false); // Set to false initially
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
  const AddNote = async () => {
    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer actual_token_value_here');

    const body = {
      title: noteTitle,
      description: noteDesc,
      postedBy: `${userId}`,
    };

    try {
      const res = await fetch(
        'https://docs-mini-app-server.onrender.com/api/notes/addNote',
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify(body),
        },
      );

      // Continue with parsing the response
      const data = await res.json();
      setLoading(false);

      console.log('New note Data:', data);
      getNotes();

      // if (data._id != null) {
      //   navigation.navigate('Login', {id: data.id});
      // } else if (data.error && data.error.includes('duplicate key error')) {
      //   // Check if the error message indicates duplicate email
      //   showDialog('Email already exists. Try a different email.');
      // } else {
      //   Alert.alert('Register Failed', 'Try Different Email');
      // }
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
      // console.log('Response Data:', data);
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
  const handleLongPress = async (noteId: any) => {
    setSelectedNoteId(true);

    try {
      const res = await fetch(
        `https://docs-mini-app-server.onrender.com/api/notes/deleteNote/${noteId}`,
        {
          method: 'DELETE',
        },
      );
      if (res.ok) {
        setSelectedNoteId(false);
        const data = await res.json();
        onToggleSnackBar();
        console.log('Note deleted successfully ::::', data);
        getNotes();
        setTimeout(() => {
          onDismissSnackBar();
        }, 4000);
      } else {
        const errorData = await res.json();
        console.error('Error deleting note:', errorData);
      }
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
    console.log('Long Pressed on Note ID:', noteId);
    // If you want to mark the note as selected, pass the noteId
  };
  const updatenote = async () => {
    setLoading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer actual_token_value_here');

    const body = {
      title: updatenoteTitle,
      description: updatenoteDesc,
      postedBy: `${userId}`,
    };
    // console.log(updatenoteTitle,updatenoteDesc)
    try {
      const res = await fetch(
        `https://docs-mini-app-server.onrender.com/api/notes/updateNote/${selectedCardData._id}`,
        {
          headers: headers,
          method: 'PUT',
          body: JSON.stringify(body),
        },
      );

      // Continue with parsing the response
      const data = await res.json();
      setLoading(false);

      console.log('Updated Data:', data);
      hideModaleditInput();
      getNotes();
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
  // const containerStyle = {backgroundColor: 'white', padding: 20};
  const EditNoteContent = () => (
    <ScrollView style={styles.scrollView}>
      <TextInput
        autoCorrect={false}
        style={{marginTop: 10, marginBottom: 10}}
        label="Title"
        value={updatenoteTitle}
        onChangeText={text => setUpdatenoteTitle(text)}
        mode="outlined"
      />
      <TextInput
        multiline
        numberOfLines={10}
        style={{marginTop: 10, marginBottom: 10}}
        label="Description"
        value={updatenoteDesc}
        onChangeText={text => {
          setUpdatenoteDesc(text);
        }}
        mode="outlined"
      />
      <TouchableOpacity style={styles.changesButton} onPress={updatenote}>
        <Text style={styles.changesButtonText}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const ViewNoteContent = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.cardTitle}>{updatenoteTitle}</Text>
      <Text style={styles.cardText}>{updatenoteDesc}</Text>
    </ScrollView>
  );

  const toggleEditInput = () => setEditInput(prevState => !prevState);

  const hideModalEditInput = () => {
    setSelectedCardData(null);
    setVisible(false);
    setEditInput(false);
  };
  return (
    <View
      style={{
        height: 780,
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {noteData?.map((noteData: any, i: any) => (
          <Animated.View
            key={noteData._id}
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
                onPress={() => showModal(noteData)}
                onLongPress={() => handleLongPress(noteData._id)}>
                <Icon size={24} color="white" name="file-alt" />
                <Text variant="titleMedium" style={{color: 'white'}}>
                  {noteData.title}
                </Text>
                <Text variant="labelSmall" style={{color: 'white'}}>
                  {noteData.description.slice(0, 50)}
                </Text>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModaleditInput}
                    contentContainerStyle={styles.containerStyle}>
                    {selectedCardData && (
                      <>
                        <TouchableOpacity
                          onPress={hideModalEditInput}
                          style={styles.editIcon}>
                          <Icon size={24} color="black" name="times-circle" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={toggleEditInput}
                          style={styles.editIcon2}>
                          <Icon size={24} color="black" name="edit" />
                        </TouchableOpacity>
                        {editInput ? <EditNoteContent /> : <ViewNoteContent />}
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
      </ScrollView>

      <Modal
        visible={visibleAdd}
        onDismiss={hideModalAdd}
        contentContainerStyle={styles.AddnoteContanier}>
        <TouchableOpacity onPress={hideModalAdd} style={styles.closeBtnNote}>
          <Icon size={24} color="red" name="times-circle" />
        </TouchableOpacity>

        <ScrollView style={styles.AddNoteScrollView}>
          <RNTextInput
            placeholder="Title"
            style={styles.AddnotecardTitle}
            onChangeText={txt => setNoteTitle(txt)}
          />
          <RNTextInput
            placeholder="Description"
            style={styles.AddnotecardText}
            multiline={true}
            onChangeText={txt => setNoteDesc(txt)}
          />

          <TouchableOpacity
            style={styles.AddNoteButton}
            onPress={() => {
              AddNote();
              hideModalAdd(); // Call hideModalAdd as a function
            }}>
            <Text style={styles.AddNoteButtonText}>Save Note</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      {selectedNoteId ? (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 15,
            backgroundColor: 'rgb(205,92,92)',
            justifyContent: 'center',
            marginHorizontal: 165,
            width: 50,
            padding: 10,
            borderRadius: 15,
          }}>
          <Icon size={20} color="white" name="trash" />
        </TouchableOpacity>
      ) : (
        ''
      )}

      <FAB.Group
        // fabStyle={styles.fab}
        theme={{colors: {background: 'rgba(33, 33, 33, 0.06)'}}}
        open={open}
        visible
        icon={open ? 'note' : 'plus'}
        actions={[
          {icon: 'plus', onPress: () => showModalAdd('')},
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
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'No Worries',
          onPress: () => {
            // Do something
          },
        }}>
        Your note deleted successfully!
      </Snackbar>
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
  AddnoteContanier: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: '60%', // Adjusted height for better visibility of the ScrollView
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeBtnNote: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the icon appears above the ScrollView content
  },
  AddNoteScrollView: {
    marginTop: 20,
    padding: 10,
  },
  AddnotecardTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    borderBottomWidth: 1, // Add this line to create an underline effect
    borderColor: 'gray',
    paddingVertical: 8,

    padding: 5,
  },
  AddnotecardText: {
    marginTop: 10,
    color: 'black',
    marginBottom: 15,
    borderBottomWidth: 1, // Add this line to create an underline effect
    borderColor: 'gray',
    paddingVertical: 8,

    padding: 5,
    height: 150, // Set the height according to your design
    textAlignVertical: 'top',
  },
  AddNoteButton: {
    backgroundColor: '#637A9F',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 50,
  },
  AddNoteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Cards;
