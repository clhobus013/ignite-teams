import { Container, Logo, BackButtton, BackIcon } from "./styles";

import logoImg from '@assets/logo.png';

type Props = {
    showBackButton?: boolean;
}

export function Header({showBackButton = false}: Props) {
    return (
        <Container>
            {showBackButton && (
                <BackButtton>
                    <BackIcon name="left"/>
                </BackButtton>
            )}

            <Logo source={logoImg}/>
        </Container>
    )
}