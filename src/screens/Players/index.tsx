import { Container, Form } from "./styles";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";

export function Players() {
    return(
        <Container>
            <Header showBackButton/>
            <Highlight
                title="Nome da turma"
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome do participante"
                    autoCorrect={false}
                />

                <ButtonIcon icon="add" type="PRIMARY"/>
            </Form>


            <Button
                title="Remover turma"
                type="SECONDARY"
            />
        </Container>
    )
}