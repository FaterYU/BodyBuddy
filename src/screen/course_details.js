import { Divider } from '@rneui/themed';
import { Button, Center, Flex, IconButton, VStack, Box, Icon, ScrollView } from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    FlatList,
    ReactFragment,
    ImageBackground,
    TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function DetailsScreen({ navigation }) {
    const goBack = () => {
        navigation.navigate('Courses');
    }
    const goToVideo = () => {
        navigation.navigate('VideoScreen');
    }
    return (
        <ScrollView>
            <View style={styles.top}>
                <View style={{ width: "95%", flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={goBack}>
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                    <MaterialCommunityIcons
                        name="share"
                        size={35}
                        color="white"
                    />
                </View>
                <Text style={styles.header}>HIIT燃脂.臀腿初级</Text>
                <View style={styles.top_list}>
                    <View>
                        <Text style={styles.tlhead}>时长</Text>
                        <Text style={styles.tldetails}>2次</Text>
                    </View>
                    <Divider style={styles.tl_divider} orientation='vertical' width={2} />
                    <View>
                        <Text style={styles.tlhead}>燃脂</Text>
                        <Text style={styles.tldetails}>68千卡</Text>
                    </View>
                    <Divider style={styles.tl_divider} orientation='vertical' width={2} />
                    <View>
                        <Text style={styles.tlhead}>难度</Text>
                        <Text style={styles.tldetails}>零基础</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text
                    style={{
                        color: "#333333",
                        fontSize: 22,
                        fontWeight: "900",
                        margin: 10,
                        marginTop: 20
                    }}>
                    课程介绍
                </Text>
                <Text
                    style={{
                        color: "#6E6E6E",
                        fontSize: 16,
                        margin: 10,
                        marginTop: 10
                    }}>
                    HIIT通过短暂高强度的运动和休息的交替重复进行，
                    能在单位时间内就达到非常高的能量消耗效果，
                    对于快节奏生活的都市人群来说这是一种非常不错的训练方式。
                </Text>
                <View style={styles.card}>
                    <View style={{flexDirection:'colum',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(1,1,1,0)'}}>
                        <Text style={styles.cardhead}>训练次数</Text>
                        <Text style={styles.carddetails}>2次</Text>
                    </View>
                    <Divider style={styles.card_divider} orientation='vertical' width={2} />
                    <View style={{flexDirection:'colum',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(1,1,1,0)'}}>
                        <Text style={styles.cardhead}>最高评分</Text>
                        <Text style={styles.carddetails}>95分</Text>
                    </View>
                    <Divider style={styles.card_divider} orientation='vertical' width={2} />
                    <View style={{flexDirection:'colum',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(1,1,1,0)'}}>
                        <Text style={styles.cardhead}>连续天数</Text>
                        <Text style={styles.carddetails}>2天</Text>
                    </View>
                </View>
                <View>
                    <Text
                        style={{
                            color: "#333333",
                            fontSize: 22,
                            fontWeight: "900",
                            marginTop: 20,
                            margin: 10,
                        }}>
                        动作列表
                    </Text>
                </View>
            </View>
            <VStack>
                <View style={styles.list}>
                    <View style={styles.list_pic}></View>
                    <View style={{justifyContent:'flex-start',flexDirection:'column'}}>
                        <Text style={styles.list_head}>臀部动态拉伸</Text>
                        <Text style={styles.list_details}>10次</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={styles.list_pic}></View>
                    <View style={{justifyContent:'flex-start',flexDirection:'column'}}>
                        <Text style={styles.list_head}>正踢腿</Text>
                        <Text style={styles.list_details}>16次</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={styles.list_pic}></View>
                    <View style={{justifyContent:'flex-start',flexDirection:'column'}}>
                        <Text style={styles.list_head}>俯身转体</Text>
                        <Text style={styles.list_details}>8次</Text>
                    </View>
                </View>
            </VStack>
            <View style={{justifyContent:'center',alignItems:'center',width:'100%',marginVertical:10}}>
                <TouchableOpacity style={styles.button} onPressOut={goToVideo}>
                    <Text style={{color:'white',fontSize:18}}>开始第3次训练</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    top: {
        height: screenHeight * 0.33,
        width: "100%",
        backgroundColor: "gray",
        justifyContent: "center",
    },
    header: {
        fontWeight: "900",
        color: "white",
        fontSize: 32,
        alignSelf: 'center',
        marginTop: "10%",
    },
    top_list: {
        alignSelf: "center",
        height: 100,
        marginTop: 15,
        flexDirection: "row",
        width: "80%",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tlhead: {
        flexDirection: "row",
        marginTop: 20,
        color: "white",
        fontSize: 15,
        alignSelf: "center"
    },
    tl_divider: {
        color: "#E4E4E4",
        marginVertical: 40,
    },
    tldetails: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
        color: "white",
        fontSize: 25,
        flexGrow: 3,
    },
    card: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
        height: 100,
        borderRadius: 20,
        flexDirection: "row",
        alignSelf: "center",
        width: "90%",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardhead: {
        marginTop: 5,
        width: "110%",
        color: "#4969FF",
        fontSize: 20,
        fontWeight: "900",
        justifyContent: "space-around",
        alignItems: 'center'
    },
    card_divider: {
        color: "#E4E4E4",
        marginVertical: 25,
    },
    carddetails: {
        marginTop: 10,
        color: "black",
        fontSize: 25,
        fontWeight: "900",
    },
    list: {
        width: "90%",
        height: 100,
        marginTop: 15,
        marginLeft: 10,
        flexDirection: "row",
    },
    list_pic: {
        width: 125,
        height: 100,
        backgroundColor: "gray",
        marginLeft: 0,
        borderRadius: 10,
    },
    list_head: {
        marginLeft: 15,
        marginTop: 5,
        color: "#333333",
        fontSize: 18,

    },
    list_details: {
        marginLeft: 15,
        fontSize: 16,
    },
    button: {
        width: "90%",
        borderRadius: 20,
        backgroundColor: "#4969FF",
        height:40,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default DetailsScreen;
