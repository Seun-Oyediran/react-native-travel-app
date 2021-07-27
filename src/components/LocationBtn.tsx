import React from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import { BlurView } from 'expo-blur';

interface IProps {
  onPress: () => void;
}

const LocationBtn = (props: IProps) => {
  const { onPress } = props;
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={{ position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: '100%',
              height: '100%',
            }}
          />
          <BlurView intensity={70} tint="dark" style={styles.viewCon}>
            <Text style={styles.text}>explore this city</Text>
          </BlurView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LocationBtn;

const styles = StyleSheet.create({
  viewCon: {
    borderRadius: 5,
    paddingVertical: 22,
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontFamily: 'NOIR',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 27,
  },
});
