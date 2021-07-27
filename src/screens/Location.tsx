import React, { useState, useRef } from 'react';

import {
  Image,
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LandingNav, LocationBtn } from '../components';
import { travelArray } from '../helpers/Utils';
import { TravelStackProps } from '../Routes';

const { width, height } = Dimensions.get('window');

const Location = (props: TravelStackProps<'Loaction'>) => {
  const { navigation } = props;
  const [indexes, setIndexes] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bigScroll = useRef(null);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}>
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              ref={bigScroll}
              style={[StyleSheet.absoluteFillObject]}
              horizontal
              pagingEnabled
              decelerationRate="fast"
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
              data={travelArray}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    {
                      flex: 1,
                      width,
                      // height,
                    },
                  ]}
                >
                  <Animated.Image
                    blurRadius={1}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        width,
                        height: '100%',
                      },
                    ]}
                    resizeMode="cover"
                    source={item.img}
                  />
                </View>
              )}
            />
          </View>
        </Animated.View>
        <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: height * 0.04 }}>
          <View>
            <LandingNav search lineBg="#ffffff" />
            <View style={[styles.viewCon, { marginTop: 25 }]}>
              <Text style={styles.firstText}>Choose</Text>
              <Text style={styles.firstText}>your city</Text>
            </View>
          </View>
          <View style={[styles.viewCon, { flex: 1, marginVertical: 20 }]}>
            <View style={styles.flatListCon}>
              <Animated.FlatList
                data={travelArray}
                horizontal
                onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                  let newIndex = Math.ceil(
                    event.nativeEvent.contentOffset.x / (width - width * 0.06 - 25.5),
                  );
                  if (newIndex > travelArray.length - 1) {
                    newIndex = travelArray.length - 1;
                  }
                  setIndexes(newIndex);
                  bigScroll.current.scrollToIndex({ index: newIndex });
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                  useNativeDriver: false,
                })}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={width - width * 0.06 - 25.5}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: width - width * 0.06 - 25.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{ resizeMode: 'cover', width: '100%', height: '100%' }}
                    />
                  </View>
                )}
              />
            </View>
            <View style={styles.location}>
              <Text style={styles.locationText}>{travelArray[indexes].name}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.dotsCon}>
                {[...Array(travelArray.length).keys()].map((_, i) => {
                  const newW = width - width * 0.06 - 26;
                  const widthAnim = scrollX.interpolate({
                    inputRange: [(i - 1) * (newW * 0.94), newW * 0.94 * i, (i + 1) * (newW * 0.94)],
                    outputRange: [8, 25, 8],
                    extrapolate: 'clamp',
                  });
                  return <Animated.View key={i} style={[styles.dots, { width: widthAnim }]} />;
                })}
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: width * 0.06 }}>
            <LocationBtn
              onPress={() => {
                navigation.navigate('HomeScreen', { item: travelArray[indexes] });
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  viewCon: {
    marginHorizontal: width * 0.06,
  },
  firstText: {
    color: '#000000',
    fontFamily: 'PLAYFAIR',
    fontSize: 45,
    lineHeight: 53,
  },
  flatListCon: {
    flex: 1,
    borderWidth: 14,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    // borderRadius: 4,
    overflow: 'hidden',
  },
  location: {
    backgroundColor: '#ffffff',
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
  },
  locationText: {
    color: '#000000',
    fontFamily: 'NOIR',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontSize: 24,
    lineHeight: 27,
  },
  dotsCon: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 33,
    height: 22,
    transform: [{ translateY: -11 }],
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dots: {
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: '#72978F',
    marginHorizontal: 3,
  },
});
