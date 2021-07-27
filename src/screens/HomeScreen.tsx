import React, { useState, useRef } from 'react';
import {
  Feather, AntDesign, Ionicons, Entypo, FontAwesome5,
} from '@expo/vector-icons';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TravelStackProps } from '../Routes';
import { homeArray, travelArray } from '../helpers/Utils';

const { width, height } = Dimensions.get('window');
const SCREEN_PADDING = width * 0.06;
const FIRST_HEIGHT = height * 0.27;
const SECOND_HEIGHT = height * 0.16;
const THIRD_HEIGHT = height * 0.2;
const FLOATING_WIDTH = width - SCREEN_PADDING * 2;

const navArray = ['all', 'museums', 'historical places', 'restaurants'];

const HomeScreen = (props: TravelStackProps<'HomeScreen'>) => {
  const { route } = props;
  const { params } = route;
  const [activeLink, setActiveLink] = useState('all');
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [btnValue, setBtnValue] = useState(0);

  const btnAnimation = (toValue: number) => Animated.timing(animatedValue, {
    toValue,
    duration: 700,
    useNativeDriver: false,
  });

  const CloseBtn = () => {
    setBtnValue(0);
    btnAnimation(0).start();
  };

  const OpenBtn = () => {
    setBtnValue(1);
    btnAnimation(1).start();
  };

  const btnContentOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const btnWidth = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [67, FLOATING_WIDTH, FLOATING_WIDTH],
  });

  const btnHeight = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [67, 67, 160],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.navBar}>
            <View>
              <Text style={styles.discoverText}>Discover,</Text>
              <Text style={[styles.discoverText, styles.locationText]}>
                {`${params.item.name}!`}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.icon}>
                  <Feather name="search" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatList
              data={navArray}
              style={{ paddingVertical: 15 }}
              contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING, marginHorizontal: -11 }}
              keyExtractor={(navItem) => navItem}
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setActiveLink(item);
                  }}
                >
                  <View style={activeLink === item ? styles.activeNavCon : styles.navCon}>
                    <Text style={activeLink === item ? styles.activeNavText : styles.navText}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ paddingHorizontal: SCREEN_PADDING, marginVertical: 15 }}>
            <Text style={styles.topText}>Top activities</Text>
            <View
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                marginTop: 10,
                position: 'relative',
              }}
            >
              <Animated.FlatList
                data={homeArray}
                nestedScrollEnabled
                horizontal
                snapToInterval={width - SCREEN_PADDING * 2}
                keyExtractor={(items) => items.id.toString()}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                  useNativeDriver: false,
                })}
                renderItem={({ item }) => (
                  <View
                    style={{
                      height: FIRST_HEIGHT,
                      width: width - SCREEN_PADDING * 2,
                      position: 'relative',
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                    />
                    <View style={styles.flatListLoc}>
                      <Ionicons name="map-outline" size={13} color="#D27C4A" />
                      <Text style={styles.flatListLocText}>Centraal</Text>
                    </View>
                    <View style={styles.rightAbsolute}>
                      <View style={styles.ratingCon}>
                        <AntDesign name="star" size={10} color="white" />
                        <Text style={styles.ratingText}>4.1</Text>
                      </View>
                      <View style={styles.timeCon}>
                        <AntDesign name="clockcircleo" size={12} color="#E2E2E2" />
                        <Text style={styles.timeConText}>Closest 7.35pm</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
              <View style={styles.canalCon}>
                <View>
                  <Text style={styles.canalBigText} numberOfLines={2} adjustsFontSizeToFit>
                    Taking a boat tour through Canals
                  </Text>
                </View>
              </View>
              <View style={styles.scollIndicator}>
                {travelArray.map((_, ind) => {
                  const inputRange = [
                    (width - SCREEN_PADDING * 2) * (ind - 1),
                    (width - SCREEN_PADDING * 2) * ind,
                    (width - SCREEN_PADDING * 2) * (ind + 1),
                  ];
                  const indicatorWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 25, 8],
                    extrapolate: 'clamp',
                  });

                  return (
                    <Animated.View
                      key={ind}
                      style={[styles.scollIndicatorDot, { width: indicatorWidth }]}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: SCREEN_PADDING, marginVertical: 15, marginBottom: 30 }}>
            <Text style={[styles.topText, styles.nearbyTitle]}>Nearby activities</Text>
            <View>
              <View style={{ flexDirection: 'row', height: SECOND_HEIGHT, marginHorizontal: -7 }}>
                <View style={[styles.nearByItemCon, { flex: 2 }]}>
                  <Image
                    source={homeArray[0].img}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                  <View style={styles.rightAbsolute}>
                    <View style={styles.ratingCon}>
                      <AntDesign name="star" size={10} color="white" />
                      <Text style={styles.ratingText}>4.7</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.nearByItemCon]}>
                  <Image
                    source={homeArray[1].img}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                  <View style={styles.rightAbsolute}>
                    <View style={styles.ratingCon}>
                      <AntDesign name="star" size={10} color="white" />
                      <Text style={styles.ratingText}>3.6</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: THIRD_HEIGHT,
                  marginVertical: 15,
                }}
              >
                <View style={[styles.nearByItemCon, { marginHorizontal: 0 }]}>
                  <Image
                    source={homeArray[2].img}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                  <View style={styles.rightAbsolute}>
                    <View style={styles.ratingCon}>
                      <AntDesign name="star" size={10} color="white" />
                      <Text style={styles.ratingText}>5.0</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Animated.View
          style={[
            styles.floatingBtn,
            {
              height: btnHeight,
              width: btnWidth,
            },
          ]}
        >
          {btnValue === 0 && (
            <TouchableOpacity
              onPress={() => {
                OpenBtn();
              }}
              style={styles.openBtn}
            >
              <AntDesign name="menuunfold" size={28} color="white" />
            </TouchableOpacity>
          )}
          {btnValue !== 0 && (
            <Animated.View style={{ flex: 1, opacity: btnContentOpacity }}>
              <View style={styles.upperBtnCon}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ alignItems: 'center' }}>
                    <Entypo name="compass" size={24} color="#E5E5E5" />
                    <Text style={styles.btnLinks}>discover</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ alignItems: 'center' }}>
                    <Feather name="map" size={24} color="#E5E5E5" />
                    {/* eslint-disable-next-line */}
                    <Text style={styles.btnLinks}>do's</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ alignItems: 'center' }}>
                    <FontAwesome5 name="list-alt" size={24} color="#e5e5e5" />
                    <Text style={styles.btnLinks}>done</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 26 / 2,
                        backgroundColor: 'white',
                      }}
                    />
                    <Text style={styles.btnLinks}>profile</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.lowerBtnCon}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  <Entypo name="location" size={20} color="white" />
                  <Text style={styles.lowerBtnText}>Change city</Text>
                </View>

                <TouchableOpacity
                  style={{ marginLeft: 'auto' }}
                  onPress={() => {
                    CloseBtn();
                  }}
                >
                  <View style={{ height: '100%', justifyContent: 'center', paddingHorizontal: 6 }}>
                    <AntDesign name="close" size={28} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_PADDING,
    marginVertical: 15,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#F4F1EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoverText: {
    fontFamily: 'PLAYFAIR',
    color: '#000000',
    fontSize: 28,
    lineHeight: 40,
  },
  locationText: {
    fontFamily: 'PLAYFAIR_BOLD',
  },
  navCon: {
    marginHorizontal: 11,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  activeNavCon: {
    marginHorizontal: 11,
    paddingVertical: 6,
    paddingHorizontal: 13,
    backgroundColor: '#D5E5E2',
    borderRadius: 29,
  },
  navText: {
    fontFamily: 'NOIR',
    fontSize: 12,
    lineHeight: 14,
    color: '#666462',
    textTransform: 'uppercase',
  },
  activeNavText: {
    fontFamily: 'NOIR',
    fontSize: 12,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: '#5B7D76',
  },
  topText: {
    fontFamily: 'NOIR',
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '100',
    color: '#666462',
  },
  flatListLoc: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFF0D8',
    padding: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListLocText: {
    fontFamily: 'NOIR',
    color: '#D27C4A',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 3,
  },
  rightAbsolute: {
    position: 'absolute',
    top: 10,
    right: 10,
    maxWidth: 53,
    alignItems: 'center',
  },
  ratingCon: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'NOIR',
    letterSpacing: 1.6,
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  timeCon: {
    backgroundColor: '#000000',
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    padding: 4,
  },
  timeConText: {
    fontFamily: 'NOIR',
    fontSize: 12,
    lineHeight: 16,
    color: '#E2E2E2',
    textAlign: 'center',
  },
  canalCon: {
    position: 'absolute',
    bottom: 26,
    left: 10,
  },
  canalBigText: {
    fontFamily: 'NOIR',
    fontSize: 28,
    lineHeight: 33,
    color: '#ffffff',
    maxWidth: (width - SCREEN_PADDING) * 0.8,
  },
  scollIndicator: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    flexDirection: 'row',
  },
  scollIndicatorDot: {
    height: 8,
    backgroundColor: '#ffffff',
    marginHorizontal: 3,
    borderRadius: 8 / 2,
  },
  nearbyTitle: {
    fontSize: 17,
  },
  nearByItemCon: {
    flex: 1,
    marginHorizontal: 7,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  floatingBtn: {
    position: 'absolute',
    right: SCREEN_PADDING,
    bottom: 16,
    borderRadius: 67 / 2,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  openBtn: {
    height: 67,
    width: 67,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 67 / 2,
  },
  lowerBtnCon: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2E2E2E',
    paddingHorizontal: 10,
  },
  upperBtnCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  lowerBtnText: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontFamily: 'NOIR',
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 18,
  },
  btnLinks: {
    color: '#E5E5E5',
    fontFamily: 'NOIR',
    fontSize: 10,
    lineHeight: 18,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
