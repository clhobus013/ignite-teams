import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";

import { AppError } from "@utils/AppError";
import { groupCreate } from "@storage/group/groupCreate";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";

export function NewGroup() {

    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew() {
        try {
            if(group.trim().length === 0) {
                return Alert.alert('Nova turma', 'Informe o nome da turma.');
            }

            await groupCreate(group);
            navigation.navigate('players', { group });

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Nova turma', error.message);
            } else {
                Alert.alert('Nova turma', 'Não foi possível cadastrar uma nova turma.');
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon name='users'/>
                <Highlight
                    title="Nova turma" 
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