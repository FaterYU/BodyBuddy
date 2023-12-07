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
  useDisclose,
  Button,
  Center,
  IconButton,
  Icon,
  HStack,
  Modal,
  FormControl,
  Popover 
} from 'native-base';

const AgendaScreen = () => {
  const [items, setItems] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
          "startTime": {
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

  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

  const loadItems = (day) => {
    const currentItems = items || {};
    const postData =[
      {
          "activityDate": {
              "year": 2023,
              "month": 12,
              "day": 6
          },
          "activityList": [
              {
                  "activityId": 2,
                  "activityDate": {
                      "year": 2023,
                      "month": 12,
                      "day": 6
                  },
                  "startTime": {
                      "hour": 12,
                      "minute": 12
                  },
                  "activityEndTime": {
                      "hour": 22,
                      "minute": 12
                  },
                  "activityContent": "I am activity",
                  "activityCourse": null
              },
              {
                  "activityId": 3,
                  "activityDate": {
                      "year": 2023,
                      "month": 12,
                      "day": 6
                  },
                  "startTime": {
                      "hour": 12,
                      "minute": 12
                  },
                  "activityEndTime": {
                      "hour": 22,
                      "minute": 12
                  },
                  "activityContent": "I am activity",
                  "activityCourse": null
              },
              {
                  "activityId": 1,
                  "activityDate": {
                      "year": 2023,
                      "month": 12,
                      "day": 6
                  },
                  "startTime": {
                      "hour": 12,
                      "minute": 12
                  },
                  "activityEndTime": {
                      "hour": 22,
                      "minute": 12
                  },
                  "activityContent": "I am activity",
                  "activityCourse": {
                      "id": 1,
                      "name": "Push-up training • Upper body strength burst more easily!",
                      "photo": "push_up_training.jpg"
                  }
              }
          ]
        },
        {
          "activityDate": {
              "year": 2023,
              "month": 12,
              "day": 7
          },
          "activityList": [
              {
                  "activityId": 2,
                  "activityDate": {
                      "year": 2023,
                      "month": 12,
                      "day": 7
                  },
                  "startTime": {
                      "hour": 12,
                      "minute": 12
                  },
                  "activityEndTime": {
                      "hour": 22,
                      "minute": 12
                  },
                  "activityContent": "I am activity",
                  "activityCourse": null
              },
            ]
        }
      ]
    setTimeout(() => {
      for (let i = -10; i < 15; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!currentItems[strTime]) {
          currentItems[strTime] = [];
        }
      }
      const dataLength = Object.keys(postData).length;
      const Data = postData;
      for (let i = 0; i < dataLength; i++) {
        const month = Data[i].activityDate.month < 10 ? '0' + Data[i].activityDate.month : Data[i].activityDate.month;
        const day = Data[i].activityDate.day < 10 ? '0' + Data[i].activityDate.day : Data[i].activityDate.day;
        const date = Data[i].activityDate.year + '-' + month + '-' + day;
        for (let j = 0; j < Data[i].activityList.length; j++) {
          currentItems[date].push({
            startTime: Data[i].activityList[j].startTime.hour + ':' + Data[i].activityList[j].startTime.minute,
            endTime: Data[i].activityList[j].activityEndTime.hour + ':' + Data[i].activityList[j].activityEndTime.minute,
            content: Data[i].activityList[j].activityContent,
            course: Data[i].activityList[j].activityCourse,
            day: date,
          });
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
        onPress={() => {
          setEventTime(reservation.startTime); // 设置日程的开始时间
          setEventContent(reservation.content); // 设置日程的内容
          setShowModal(true);
          console.log('press');
          return true;
        }}
        onLongPress={() => {
          setShowDeleteModal(true);
          console.log('long press');
          return true;
        }}
        >
        <Text style={{ fontSize, color }}>{reservation.startTime}</Text>
        <Text style={{fontSize, color}}>{reservation.endTime}</Text>
        <Text style={{fontSize, color}}>{reservation.content}</Text>
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
    return r1.content !== r2.content || r1.startTime !== r2.startTime || r1.endTime !== r2.endTime || r1.course !== r2.course || r1.day !== r2.day;
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
      {showDeleteModal && (
        <Center>
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>删除日程</Modal.Header>
            <Modal.Body>
              <Text>确定删除该日程吗？</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowDeleteModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowDeleteModal(false);
                    colorScheme="red"
                  }}
                >
                  Delete
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
