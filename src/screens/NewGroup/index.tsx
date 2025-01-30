import { Container, Content, Icon } from "./styles";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function NewGroup() {

    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    function handleNew() {
        navigation.navigate('players', { group })
    }

    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon name='users'/>
                <Highlight
                    title="Nova Turma" 
                    subtitle="crie uma turma para adicionar as pessoas" 
                />

                <Input
                    placeholder="Nome da turma"
                    value={group}
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />

            </Content>
        </Container>
    )
}