import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars';
const App = () => {
  return (
      <Agenda
        // 列表中要显示的项目。如果要将项目呈现为空日期，日期键的值必须是一个空数组 []。如果日期键没有值，则认为该日期尚未加载。
        items={{
          '2012-05-22': [{ text: 'item 1 - any js object' }],
          '2012-05-23': [{ text: 'item 2 - any js object' }],
          '2012-05-24': [],
          '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
        }}
        // 当加载某个月的项目时触发的回调（月份变得可见）
        loadItemsForMonth={(month) => { console.log('trigger items loading'); }}
        // 在按下日期时触发的回调
        onDayPress={(day) => { console.log('day pressed'); }}
        // 在滚动日程列表时日期更改时触发的回调
        onDayChange={(day) => { console.log('day changed'); }}
        // 初始选择的日期
        selected={'2012-05-16'}
        // 可选择的最小日期，minDate之前的日期将变灰。默认 = undefined
        minDate={'2012-05-10'}
        // 可选择的最大日期，maxDate之后的日期将变灰。默认 = undefined
        maxDate={'2012-05-30'}
        // 允许向过去滚动的最大月份数。默认 = 50
        pastScrollRange={50}
        // 允许向未来滚动的最大月份数。默认 = 50
        futureScrollRange={50}
        // 指定如何呈现日程中的每个项目
        renderItem={(item, firstItemInDay) => { return (<View />); }}
        // 指定如何呈现每个日期。如果该项不是当天的第一项，则日期可能为 undefined。
        renderDay={(day, item) => { return (<View />); }}
        // 指定如何呈现没有项目的空日期内容
        renderEmptyDate={() => { return (<View />); }}
        // 指定日程旋钮的外观
        renderKnob={() => { return (<View />); }}
        // 指定用于增强性能的项目比较函数
        rowHasChanged={(r1, r2) => { return r1.text !== r2.text; }}
        // 隐藏旋钮按钮。默认 = false
        hideKnob={true}
        // 默认情况下，如果日期至少有一个项目，日程日期将被标记，但如果需要，可以覆盖此项
        markedDates={{
          '2012-05-16': { selected: true, marked: true },
          '2012-05-17': { marked: true },
          '2012-05-18': { disabled: true },
        }}
        // 日程主题
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        // 日程容器样式
        style={{}}
      />

  );
};

export default App;