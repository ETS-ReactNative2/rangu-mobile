
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuButton({ onPress, focused }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Button
                colors={
                    focused
                        ? ['#fff', '#ccc']
                        : ['#D7233C', '#E65F4C']
                }
                start={[1, 0.2]}
            >
                <MaterialIcons
                    name="menu-book"
                    size={30}
                    color={focused ? '#000' : '#fff'}
                />
                <Label focused={focused}>Menu</Label>
            </Button>
        </TouchableWithoutFeedback>
    );
}



const Button = styled(LinearGradient)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 12px;
  color: ${({ focused }) => focused ? '#000' : '#fff'};
`;