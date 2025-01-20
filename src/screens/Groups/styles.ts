import styled from 'styled-components/native'
import { DefaultTheme } from 'styled-components';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }: DefaultTheme) => theme.COLORS.GRAY_600};
    align-items: center;
    justify-content: center;
`;