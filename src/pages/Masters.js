import {Block} from "../components/Block";
import {Button, Group, SimpleGrid, Title} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../app/slices/userSlice";
import {useModals} from "@mantine/modals";
import {MasterForm} from "../components/forms/MasterForm";
import {getMasters, mastersSelector} from "../app/slices/mastersSlice";
import {useEffect} from "react";
import {MasterCard} from "../components/cards/MasterCard";

export const Masters = () => {
    const {isAdmin} = useSelector(userSelector)
    const modals = useModals()
    const dispatch = useDispatch()
    const masters = useSelector(mastersSelector)

    useEffect(() => {
        dispatch(getMasters())
    }, [])

    const createMaster = () => {
        modals.openModal({
            title: "Добавление мастера",
            children: <MasterForm/>
        })
    }

    return <>
        <Block>
            <Group position={"apart"}>
                <Title order={3}>
                    Все мастера
                </Title>
                {isAdmin && <Button onClick={createMaster}>Добавить мастера</Button>}
            </Group>
        </Block>
        <SimpleGrid cols={3}>
            {masters.map(master => <MasterCard key={master.id} master={master} isAdmin={isAdmin}/> )}
        </SimpleGrid>
    </>
}