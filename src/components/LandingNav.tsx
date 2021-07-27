import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface IProps {
  lineBg: '#E6E4DF' | '#ffffff';
  search: boolean;
}

const LandingNav = (props: IProps) => {
  const { lineBg, search } = props;

  return (
    <View style={styles.viewCon}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>LET’S GO!</Text>
        <View style={styles.lineCon}>
          <View style={[styles.line, { width: '55%', backgroundColor: lineBg }]} />
          <View style={[styles.line, { width: '20%', backgroundColor: lineBg }]} />
          <View style={[styles.line, { width: '10%', backgroundColor: lineBg }]} />
        </View>
      </View>
      <View style={{ marginRight: width * 0.06 }}>
        {search && (
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.icon}>
              <Feather name="search" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LandingNav;

const styles = StyleSheet.create({
  viewCon: {
    marginTop: 10,
    flexDirection: 'row',
  },
  lineCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
    paddingTop: 5,
  },
  line: {
    height: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingLeft: width * 0.06,
    color: '#EA8246',
    fontFamily: 'NOIR',
    fontSize: 16,
  },
});
