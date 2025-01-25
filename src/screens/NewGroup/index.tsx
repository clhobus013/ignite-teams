import { Highlight } from "@components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Button } from "@components/Button";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon name='users'/>
                <Highlight
                    title="Nova Turma" 
                    subtitle="crie uma turma para adicionar as pessoas" 
                />

                <Button
                    title="Criar"
                />

            </Content>
        </Container>
    )
}