import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LandingNav } from '../components';
import loctaionIMG from '../helpers/ImageImport';
import { TravelStackProps } from '../Routes';

const { width, height } = Dimensions.get('window');

const Landing = (props: TravelStackProps<'Landing'>) => {
  const { navigation } = props;

  return (
    <ImageBackground resizeMode="cover" style={{ flex: 1 }} source={loctaionIMG.landingIMG}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <LandingNav search={false} lineBg="#E6E4DF" />
          <View style={[styles.viewCon, { marginTop: 25 }]}>
            <Text style={styles.firstText}>Hello,</Text>
            <Text style={styles.secondText}>Stranger!</Text>
          </View>
        </View>
        <View style={styles.viewCon}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Loaction');
            }}
            activeOpacity={0.7}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Explore</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Landing;

const styles = StyleSheet.create({
  viewCon: {
    marginHorizontal: width * 0.06,
  },
  firstText: {
    color: '#72978F',
    fontFamily: 'PLAYFAIR',
    fontSize: 45,
    lineHeight: 53,
  },
  secondText: {
    color: '#000000',
    fontFamily: 'PLAYFAIR',
    fontSize: 45,
    lineHeight: 53,
  },
  btn: {
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    marginBottom: height * 0.05,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'NOIR',
    fontSize: 18,
    lineHeight: 27,
    color: '#ffffff',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
});
