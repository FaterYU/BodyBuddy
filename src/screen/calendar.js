import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

const AgendaScreen = ({navigation, route}) => {
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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (route.params?.refresh) {
      setRefresh(route.params.refresh);
    }
  }, [route.params]);

  useEffect(() => {
    setRefresh(false);
    if (startDate > endDate) {
      setEndDate(startDate);
    }
    loadItems({timestamp: new Date().getTime()});
    console.log(startDate, endDate);
  }, [startDate, endDate, refresh]);

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
      uid: global.storage?.getNumber('uid'),
      activityId: forceItem,
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
    if (global.storage.getBoolean('isLogin') === true) {
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
    } else {
      // Alert.alert('Failed to create', 'please log in first', [
      //   {
      //     text: 'Confirm',
      //   },
      // ]);
      Alert.alert('新建计划失败，请先登录', [
        {
          text: '确认',
        },
      ]);
    }
  };

  const todayDate = new Date();
  const todayString = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  const loadItems = originDay => {
    var currentItems = items || {};
    var postData;
    UsersService.getCalendarActivity({
      uid:
        global.storage.getBoolean('isLogin') === true
          ? global.storage.getNumber('uid')
          : 1,
    })
      .then(response => {
        postData = global.storage.getBoolean('isLogin') ? response.data : [];
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
                Data[i].activityList[j].activityStartTime.hour
                  .toFixed(0)
                  .padStart(2, '0') +
                ':' +
                Data[i].activityList[j].activityStartTime.minute
                  .toFixed(0)
                  .padStart(2, '0'),
              endTime:
                Data[i].activityList[j].activityEndTime.hour
                  .toFixed(0)
                  .padStart(2, '0') +
                ':' +
                Data[i].activityList[j].activityEndTime.minute
                  .toFixed(0)
                  .padStart(2, '0'),
              content: Data[i].activityList[j].activityContent,
              course: Data[i].activityList[j].activityCourse,
              day: date,
            });
          }
        }
        setItems({...currentItems});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize = 16;
    const color = 'black';
    console.log(reservation);

    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => {
          setStartDate(
            new Date(
              reservation.day + 'T' + reservation.startTime + ':00.000+08:00',
            ),
          );
          setEndDate(
            new Date(
              reservation.day + 'T' + reservation.endTime + ':00.000+08:00',
            ),
          );
          setForceItem(reservation.activityId);
          setEventTime(reservation.startTime + ' - ' + reservation.endTime);
          setEventContent(reservation.content);
          setSelectedCourse(reservation.course?.id);
          setShowModal(true);
          return true;
        }}
        onLongPress={() => {
          setForceItem(reservation.activityId);
          setShowDeleteModal(true);
          return true;
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize, color, fontWeight: 'bold'}}>
            {reservation.startTime}
          </Text>
          <Text style={{fontSize, color, fontWeight: 'bold'}}> - </Text>
          <Text style={{fontSize, color, fontWeight: 'bold'}}>
            {reservation.endTime}
          </Text>
        </View>
        <Text style={{fontSize, color}}>{reservation.content}</Text>
        {reservation.course && (
          <CourseCard
            key={reservation.course.id}
            courseId={reservation.course.id}
            courseImg={{
              uri:
                global.storage.getString('serverDomain') +
                'files/download?name=' +
                reservation.course.photo,
            }}
            courseName={reservation.course.name}
            courseTime={reservation.course.duration}
            courseCalorie={reservation.course.calorie}
            courseLevel={reservation.course.level}
            finishTime={reservation.course.userPracticed}
            adaptWidthRate={0.8}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = date => {
    return (
      <TouchableOpacity
        style={[styles.emptyDate]}
        onPress={() => {
          setStartDate(new Date(date));
          setEndDate(new Date(date));
          setEventContent('');
          setSelectedCourse(null);
          setShowModal(true);
        }}>
        {/* <Text>No Schedule Yet</Text> */}
        <Text>暂无日程安排</Text>
      </TouchableOpacity>
    );
  };

  const rowHasChanged = (r1, r2) => {
    // console.log('r1', r1);
    // console.log('r2', r2);
    return r1.activityId !== r2.activityId;
    // return true;
  };

  const timeToString = time => {
    var pdate = new Date(time);
    return pdate.toISOString().split('T')[0];
  };

  const showStartTimeMode = async currentMode => {
    try {
      const result = await DateTimePickerAndroid.open({
        value: startDate,
        onChange: (event, selectedDate) =>
          onStartDateTimeChange(currentMode, event, selectedDate),
        mode: currentMode,
        is24Hour: true,
      });

      if (result && result.type === 'dismissed') {
        // 用户取消选择
      }
    } catch (error) {
      // console.warn('Error occurred while opening date/time picker', error);
      console.warn('日期/时间选择器获取失败', error);
    }
  };

  const onStartDateTimeChange = (currentMode, event, selectedDate) => {
    const updatedStartDate = selectedDate || startDate;
    setStartDate(updatedStartDate);
  };

  const showEndTimeMode = async currentMode => {
    try {
      const result = await DateTimePickerAndroid.open({
        value: endDate,
        onChange: (event, selectedDate) =>
          onEndDateTimeChange(currentMode, event, selectedDate),
        mode: currentMode,
        is24Hour: true,
      });

      if (result && result.type === 'dismissed') {
        // 用户取消选择
      }
    } catch (error) {
      // console.warn('Error occurred while opening date/time picker', error);
      console.warn('日期/时间选择器获取失败', error);
    }
  };

  const onEndDateTimeChange = (currentMode, event, selectedDate) => {
    const updatedEndDate = selectedDate || endDate;
    setEndDate(updatedEndDate);
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
    setSelectedCourse(value);
  };

  const handleDelete = () => {
    if (forceItem === null) {
      // Alert.alert('Failed to delete', 'please try again', [{text: 'Confirm'}]);
      Alert.alert('删除失败，请重试', [{text: '确认'}]);
      return;
    }
    UsersService.deleteCalendarActivity({uid: 1, activityId: forceItem}).then(
      response => {
        setForceItem(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setEventContent('');
      },
      error => {
        console.log(error);
      },
    );
  };

  if (global.storage.getBoolean('isLogin') === false) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}>
        {/* <Text>You Haven't Login Yet!</Text> */}
        <Text>您尚未登录！!</Text>
        <Image
          source={require('../assets/backgrounds/empty.png')}
          alt="empty"
          style={{width: screenWidth - 80, height: screenWidth - 80}}
        />
      </View>
    );
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 20, marginLeft: 22, alignSelf: 'center'}}>
          {/* Schedule */}
          计划
        </Text>
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
            alignSelf: 'center',
            borderRadius: 4,
            marginRight: 10,
          }}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={40}
            color="rgba(80,150,240,0.8)"
          />
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
        onRefresh={() => {
          loadItems({timestamp: new Date().getTime()});
        }}
        refreshing={false}
        refreshControl={null}
      />
      {showModal && (
        <Center>
          <Modal
            isOpen={showModal}
            style={{marginTop: -20}}
            onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              {/* <Modal.Header>Create Schedule</Modal.Header> */}
              <Modal.Header>新建计划</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>
                    <Text
                      style={{fontSize: 18, fontWeight: 'bold', marginTop: -4}}>
                      {/* From */}
                      开始时间
                    </Text>
                  </FormControl.Label>
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
                        paddingHorizontal: 6,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'rgba(80,150,240,0.9)',
                          fontWeight: '600',
                        }}>
                        {startDate.toDateString().slice(4, 10)}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 40,
                        alignSelf: 'center',
                        lineHeight: 42,
                        color: 'rgba(80,150,240,0.2)',
                        fontWeight: '600',
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
                          color: 'rgba(80,150,240,0.9)',
                          fontWeight: '600',
                        }}>
                        {startDate.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>To</Text> */}
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>结束时间</Text>
                  </FormControl.Label>
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
                        paddingHorizontal: 6,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'rgba(80,150,240,0.9)',
                          fontWeight: '600',
                        }}>
                        {endDate.toDateString().slice(4, 10)}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 40,
                        alignSelf: 'center',
                        lineHeight: 42,
                        color: 'rgba(80,150,240,0.2)',
                        fontWeight: '600',
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
                          color: 'rgba(80,150,240,0.9)',
                          fontWeight: '600',
                        }}>
                        {endDate.toTimeString().slice(0, 5)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {/* Content */}
                      备注
                    </Text>
                  </FormControl.Label>
                  <TextInput
                    value={eventContent}
                    onChangeText={setEventContent}
                    placeholder={eventContent}
                    style={{
                      borderWidth: 2,
                      borderColor: 'rgba(80,150,240,0.8)',
                      borderRadius: 10,
                      overflow: 'hidden',
                      paddingLeft: 10,
                    }}
                  />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {/* Courses */}
                      课程
                    </Text>
                  </FormControl.Label>
                  <SearchablePicker
                    data={CourseList}
                    onValueChange={handleValueChange}
                    link={selectedCourse}
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
                    {/* Cancel */}
                    取消
                  </Button>
                  <Button
                    style={{backgroundColor: 'rgba(80,150,240,0.8)'}}
                    onPress={() => {
                      addCalendarActivity();
                      setShowModal(false);
                    }}>
                    {/* Save */}
                    保存
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
              {/* <Modal.Header>Delete Schedule</Modal.Header> */}
              <Modal.Header>删除计划</Modal.Header>
              <Modal.Body>
                {/* <Text>Sure to delete？</Text> */}
                <Text>确定删除计划？</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowDeleteModal(false);
                    }}>
                    {/* Cancel */}
                    取消
                  </Button>
                  <Button
                    colorScheme="red"
                    onPress={() => {
                      handleDelete();
                      setShowDeleteModal(false);
                    }}>
                    {/* Delete */}
                    删除
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
