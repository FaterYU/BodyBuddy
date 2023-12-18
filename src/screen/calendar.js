import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Agenda} from 'react-native-calendars';
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
  Popover,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import UsersService from '../services/users.service';
import CoursesService from '../services/courses.service';
import SearchablePicker from '../components/SearchablePicker';
import CourseCard from './courseCard';
import { MMKV } from '../../App';

const AgendaScreen = () => {
  const [items, setItems] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventTime, setEventTime] = useState({startTime: '', endTime: ''});
  const [eventContent, setEventContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [forceItem, setForceItem] = useState(null);
  const uid=MMKV.getString('uid');

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
    // 每次修改日程后重新加载日程
    if (showModal === false) {
      loadItems({timestamp: new Date().getTime()});
    }
    loadItems({timestamp: new Date().getTime()});
    // 重新渲染日程
    setItems(items);
    console.log(startDate, endDate)
  }
  , [startDate, endDate]);

  useEffect(() => {
    const loadCourseData = () => {
      CoursesService.findAllCourse().then(res => {
        var courseList = [];
        res.data.forEach(item => {
          courseList.push({
            label: item.name,
            value: item.id,
          });
        });
        setCourseList(courseList);
      });
    };
    loadCourseData();
  }, []);

  const addCalendarActivity = () => {
    var postData = {
      uid: 1,
      activityDate: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      },
      activityStartTime: {
        hour: startDate.getHours(),
        minute: startDate.getMinutes(),
      },
      activityEndTime: {
        hour: endDate.getHours(),
        minute: endDate.getMinutes(),
      },
      activityContent: eventContent,
      activityCourseId: selectedCourse,
    };
    console.log(postData);
    UsersService.addCalendarActivity(postData).then(
      response => {
        setStartDate(new Date());
        setEndDate(new Date());
        setEventContent('');
      },
      error => {
        console.log(error);
      },
    );
  };

  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  const loadItems = originDay => {
    var currentItems = items || {};
    var postData;
    UsersService.getCalendarActivity({uid: 1})
      .then(response => {
        postData = response.data;
        for (let i = -10; i < 15; i++) {
          const time = originDay.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!currentItems[strTime]) {
            currentItems[strTime] = [];
          }
        }
        const dataLength = Object.keys(postData).length;
        const Data = postData;
        for (let i = 0; i < dataLength; i++) {
          var month = Data[i].activityDate.month.toFixed(0).padStart(2, '0');
          var day = Data[i].activityDate.day.toFixed(0).padStart(2, '0');
          var date = Data[i].activityDate.year + '-' + month + '-' + day;
          currentItems[date] = [];
          for (let j = 0; j < Data[i].activityList.length; j++) {
            currentItems[date].push({
              activityId: Data[i].activityList[j].activityId,
              startTime:
                Data[i].activityList[j].activityStartTime.hour +
                ':' +
                Data[i].activityList[j].activityStartTime.minute,
              endTime:
                Data[i].activityList[j].activityEndTime.hour +
                ':' +
                Data[i].activityList[j].activityEndTime.minute,
              content: Data[i].activityList[j].activityContent,
              course: Data[i].activityList[j].activityCourse,
              day: date,
            });
          }
        }
        setItems(currentItems);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize =16;
    const color = 'black' ;

    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => {
          setEventTime(reservation.startTime + ' - ' + reservation.endTime);
          setEventContent(reservation.content);
          setSelectedCourse(reservation.course.id);
          setShowModal(true);
          return true;
        }}
        onLongPress={() => {
          setForceItem(reservation.activityId);
          setShowDeleteModal(true);
          return true;
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize, color, fontWeight:"bold"}}>{reservation.startTime}</Text>
          <Text style={{fontSize, color, fontWeight:"bold"}}> - </Text>
          <Text style={{fontSize, color, fontWeight:"bold"}}>{reservation.endTime}</Text>
        </View>
        <Text style={{fontSize, color}}>{reservation.content}</Text>
        {reservation.course && (
          <CourseCard
            courseImg={{
              uri:
                'http://bodybuddy.fater.top/api/files/download?name=' +
                reservation.course.photo,
            }}
            courseName={reservation.course.name}
            courseTime={30}
            courseCalorie={300}
            courseLevel={'零基础'}
            finishTTime={2}
            adaptWidthRate={0.8}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity
        style={[styles.emptyDate]}
        onPress={() => {
          setStartDate(new Date());
          setEndDate(new Date());
          setEventContent('');
          setSelectedCourse(null);
          setShowModal(true);
        }}>
        <Text>暂未添加日程</Text>
      </TouchableOpacity>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.activityId !== r2.activityId;
  };

  const timeToString = time => {
    var pdate = new Date(time);
    return pdate.toISOString().split('T')[0];
  };

  // TODO: time confilct check and alert
  const onStartDateChange = (event, selectedDate) => {
    var currentDate = startDate;
    currentDate.setDate(selectedDate.getDate());
    setStartDate(currentDate);
  };
  const onStartTimeChange = (event, selectedDate) => {
    var currentDate = startDate;
    currentDate.setHours(selectedDate.getHours());
    currentDate.setMinutes(selectedDate.getMinutes());
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    var currentDate = endDate;
    currentDate.setDate(selectedDate.getDate());
    setEndDate(currentDate);
  };
  const onEndTimeChange = (event, selectedDate) => {
    var currentDate = endDate;
    currentDate.setHours(selectedDate.getHours());
    currentDate.setMinutes(selectedDate.getMinutes());
    setEndDate(currentDate);
  };

  const showStartTimeMode = currentMode => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: currentMode === 'date' ? onStartDateChange : onStartTimeChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showEndTimeMode = currentMode => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: currentMode === 'date' ? onEndDateChange : onEndTimeChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showStartTimeTimepicker = () => {
    showStartTimeMode('time');
  };
  const showStartDateTimepicker = () => {
    showStartTimeMode('date');
  };

  const showEndTimeTimepicker = () => {
    showEndTimeMode('time');
  };
  const showEndDateTimepicker = () => {
    showEndTimeMode('date');
  };

  const handleValueChange = value => {
    console.log(value);
    setSelectedCourse(value);
  };

  const handleDelete = () => {
    if (forceItem === null) {
      Alert.alert('删除失败', '请重试', [{text: '确定'}]);
      return;
    }
    UsersService.deleteCalendarActivity({uid: 1, activityId: forceItem}).then(
      response => {
        setForceItem(null);
      },
      error => {
        console.log(error);
      },
    );
  };

  // if (uid === null) {
  //   return (
  //     <View>
  //       <Text>请先登录</Text>
  //     </View>
  //   );
  // }
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor:'white'}}>
        <Text style={{fontSize: 20, marginLeft: 22, alignSelf:'center'}}>日程</Text>
        <TouchableOpacity
          onPress={() => {
            setStartDate(new Date());
            setEndDate(new Date());
            setEventContent('');
            setSelectedCourse(null);
            setShowModal(true);
          }}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf:'center',
            borderRadius: 4,
            marginRight: 10,
          }}>
          <MaterialCommunityIcons name="plus-circle" size={40} color="rgba(80,150,240,0.8)" />
        </TouchableOpacity>
      </View>
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
                  <FormControl.Label><Text style={{fontSize:18,fontWeight:'bold'}}>From</Text></FormControl.Label>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 40,
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onPress={showStartDateTimepicker}
                      style={{
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: 'rgba(80,150,240,0.16)',
                        justifyContent: 'center',
                        borderRadius: 4,
                        paddingHorizontal:6,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:"rgba(80,150,240,0.9)",
                          fontWeight:"600"
                        }}>
                        {startDate.toDateString().slice(4, 10)}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 40,
                        alignSelf: 'center',
                        lineHeight: 42,
                        color:"rgba(80,150,240,0.2)",
                        fontWeight:"600"
                      }}>
                      {' '}
                      -{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={showStartTimeTimepicker}
                      style={{
                        width: '44%',
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: 'rgba(80,150,240,0.16)',
                        justifyContent: 'center',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:"rgba(80,150,240,0.9)",
                          fontWeight:"600"
                        }}>
                        {startDate.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </FormControl>
                <FormControl>
                  <FormControl.Label><Text style={{fontSize:18,fontWeight:'bold'}}>To</Text></FormControl.Label>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 40,
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onPress={showEndDateTimepicker}
                      style={{
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: 'rgba(80,150,240,0.16)',
                        justifyContent: 'center',
                        borderRadius: 4,
                        paddingHorizontal:6,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:"rgba(80,150,240,0.9)",
                          fontWeight:"600"
                        }}>
                        {endDate.toDateString().slice(4, 10)}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 40,
                        alignSelf: 'center',
                        lineHeight: 42,
                        color:"rgba(80,150,240,0.2)",
                        fontWeight:"600"
                      }}>
                      {' '}
                      -{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={showEndTimeTimepicker}
                      style={{
                        width: '44%',
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: 'rgba(80,150,240,0.16)',
                        justifyContent: 'center',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:"rgba(80,150,240,0.9)",
                          fontWeight:"600"
                        }}>
                        {endDate.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label><Text style={{fontSize:18,fontWeight:'bold'}}>Content</Text></FormControl.Label>
                  <TextInput value={eventContent} onChangeText={setEventContent} placeholder={eventContent} style={{borderWidth:2,borderColor:'rgba(80,150,240,0.8)',borderRadius:10,overflow:'hidden'}} />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label><Text style={{fontSize:18,fontWeight:'bold'}}>Courses</Text></FormControl.Label>
                  <SearchablePicker
                    data={CourseList}
                    onValueChange={handleValueChange}
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    style={{backgroundColor:'rgba(80,150,240,0.8)'}}
                    onPress={() => {
                      addCalendarActivity();
                      setShowModal(false);
                    }}>
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
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}>
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
                    }}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onPress={() => {
                      handleDelete();
                      setShowDeleteModal(false);
                    }}>
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
