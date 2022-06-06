import {Block} from "../components/Block";
import {Button, Group, SimpleGrid, Title} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../app/slices/userSlice";
import {useModals} from "@mantine/modals";
import {ServiceForm} from "../components/forms/ServiceForm";
import {getServices, servicesSelector} from "../app/slices/servicesSlice";
import {useEffect} from "react";
import {ServiceCard} from "../components/cards/ServiceCard";
import {OrderForm} from "../components/forms/OrderForm";

export const Services = () => {
    const {isAdmin} = useSelector(userSelector)
    const modals = useModals()
    const dispatch = useDispatch()
    const services = useSelector(servicesSelector)
    useEffect(() => {
        dispatch(getServices())
    }, [])

    const createService = () => {
        modals.openModal({
            title: "Добавление услуги",
            children: <ServiceForm/>
        })
    }

    return <>
        <Block>
            <Group position={"apart"}>
                <Title order={3}>
                    Все услуги
                </Title>
                {isAdmin && <Button onClick={createService}>Добавить услугу</Button>}
            </Group>
        </Block>
        <SimpleGrid cols={3}>
            {services.map(service => <ServiceCard key={service.id} service={service} isAdmin={isAdmin}/>)}
        </SimpleGrid>
    </>
}