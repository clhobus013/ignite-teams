import { TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
    width: 100%;
    height: 90px;

    flex-direction: row;
    align-items: center;
    border-radius: 6px;

    padding: 24px;
    margin-bottom: 12px;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`

export const Icon = styled(FontAwesome5).attrs(({theme}) => ({
    color: theme.COLORS.GREEN_700,
    size: 32
}))`
    margin-right: 20px;
`

export const Title = styled.Text`
    font-size: ${(({theme}) => theme.FONT_SIZE.MD)}px;
    font-family: ${(({theme}) => theme.FONT_FAMILY.REGULAR)};
    color: ${(({theme}) => theme.COLORS.GRAY_200)};
`