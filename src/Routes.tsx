import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TravelItemType } from './helpers/Utils';

export type TravelStackList = {
  Landing: undefined;
  Loaction: undefined;
  HomeScreen: {
    item: TravelItemType;
  };
};

export type TravelStackProps<T extends keyof TravelStackList> = {
  navigation: StackNavigationProp<TravelStackList, T>;
  route: RouteProp<TravelStackList, T>;
};
