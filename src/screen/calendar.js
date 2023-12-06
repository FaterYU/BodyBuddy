import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import {
  Input,
  TextArea,
  Box,
  Stagger,
  useDisclose,
  Button,
  Center,
  IconButton,
  Icon,
  HStack,
  Modal,
  FormControl,
} from 'native-base';

const AgendaScreen = () => {
  const [items, setItems] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [eventTime, setEventTime] = useState('');
  const [eventContent, setEventContent] = useState('');

  const createNewAct = ({startTime, endTime, content, course}) => {
      const url = 'http://bodybuddy.fater.top/api/users/addCalendarActivity'
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid": 1,
          "activityDate": {
            "year": 2023,
            "month": 12,
            "day": 6
          },
          "activityStartTime": {
            "hour": 12,
            "minute": 12
          },
          "activityEndTime": {
            "hour": 22,
            "minute": 12
          },
          "activityContent": "I am activity",
          "activityCourseId": 1
        }),
      };
      fetch(url, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
  };
  // const loadItems = (day) => {
  //   const currentItems = items || {};

  //   const url = 'http://bodybuddy.fater.top/api/users/getCalendarActivity'
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ "uid": 1 }),
  //   };
  //   fetch(url, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       for (let i = 0; i < data.length; i++) {
  //         const time = new Date(data[i].activityDate.year, data[i].activityDate.month - 1, data[i].activityDate.day).getTime();
  //         const strTime = timeToString(time);
  //         if (!currentItems[strTime]) {
  //           currentItems[strTime] = [];
  //         }
  //         currentItems[strTime].push({
  //           name: data[i].activityContent,
  //           day: strTime,
  //           startTime: data[i].activityStartTime,
  //           endTime: data[i].activityEndTime,
  //           content: data[i].activityContent,
  //           course: data[i].activityCourseId,
  //         });
  //       }
  //       setItems({ ...currentItems });
  //     })
  //     .catch(error => console.log('error', error));
  // };
  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

  const loadItems = (day) => {
    const currentItems = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!currentItems[strTime]) {
          currentItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3);
          for (let j = 0; j < numItems; j++) {
            currentItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              day: strTime,
            });
          }
        }
      }

      setItems({ ...currentItems });
    }, 1000);
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => setShowModal(true)}
        onLongPress={() => console.log('You pressed long!')}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity
        style={[styles.emptyDate]}
        onPress={() => setShowModal(true)}
      >
        <Text>暂未添加日程</Text>
      </TouchableOpacity>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={todayString}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
      {showModal && (
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>填写日程</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>时间</FormControl.Label>
                  <Input value={eventTime} onChangeText={setEventTime} />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>内容</FormControl.Label>
                  <Input value={eventContent} onChangeText={setEventContent} />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(240,240,240,1)',
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default AgendaScreen;
