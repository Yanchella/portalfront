import 'dayjs/locale/ru'
import dayjs from "dayjs";
import {Button, Card, Collapse, createStyles, Group, Text, UnstyledButton} from "@mantine/core";
import {useState} from "react";
import {useModals} from "@mantine/modals";
import {ChevronDown, ChevronUp} from "tabler-icons-react";
import {OrderForm} from "../forms/OrderForm";
import {deleteOrder} from "../../app/slices/ordersSlice";
import {useDispatch} from "react-redux";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    label: {
        // marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: 'uppercase',
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    icon: {
        marginRight: 5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },
}));

export const OrderCard = ({order}) => {
    const {classes} = useStyles()
    const modals = useModals()
    const dispatch = useDispatch()
    const [customerInfoVisible, setCustomerInfoVisible] = useState(false)

    const openEditModal = (e) => {
        modals.openModal({
            title: "Изменение записи",
            children: <OrderForm order={order}/>
        })
    }

    const handleDelete = (e) => {
        modals.closeAll()
        dispatch(deleteOrder({id: order.id}))
    }


    return <Card key={order.id} className={classes.card}>
        <Card.Section className={classes.section}>
            <Text size="sm" color="dimmed" mb={"xs"} className={classes.label}>
                Дата и время записи
            </Text>
            <Group position={"apart"}>
                <Group spacing={4}>
                    <Text>Дата:</Text><Text>{dayjs(order.date).toDate().toLocaleDateString()}</Text>
                </Group>
                <Group spacing={4}>
                    <Text>Время:</Text><Text>{dayjs(order.date).toDate().toLocaleTimeString()}</Text>
                </Group>
            </Group>
        </Card.Section>
        <Card.Section className={classes.section}>
            <Text size="sm" color="dimmed" className={classes.label} mb={'xs'}>
                Информация о записи
            </Text>
            <Group spacing={4}>
                <Text weight={"bold"}>Мастер:</Text>
                <Text>{order.master.name}</Text>
            </Group>
        </Card.Section>
        <Card.Section className={classes.section}>
            <Text size="sm" color="dimmed" className={classes.label} mb={'xs'}>
                Услуга
            </Text>
            <Group spacing={4}>
                <Text weight={"bold"}>Цена:</Text><Text>{order.service.price}</Text>
            </Group>
            <Group spacing={4}>
                <Text weight={"bold"}>Услуга:</Text>
                <Group spacing={4}>
                    <Text>{order.service.title}</Text>
                    (<Text>{order.service.description}</Text>)
                </Group>
            </Group>
        </Card.Section>
        <Card.Section className={classes.section}>
            <UnstyledButton onClick={() => setCustomerInfoVisible(!customerInfoVisible)}>
                <Group spacing={2}>
                    {customerInfoVisible ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    <Text size="sm" color="dimmed" className={classes.label}>
                        Информация о заказчике
                    </Text>
                </Group>
            </UnstyledButton>
            <Collapse in={customerInfoVisible}>
                <Group spacing={4}>
                    <Text weight={"bold"}>Телефон:</Text><Text>{order.phone}</Text>
                </Group>
                <Group spacing={4}>
                    <Text weight={"bold"}>ФИО:</Text><Text>{order.name}</Text>
                </Group>
            </Collapse>
        </Card.Section>
        <Card.Section className={classes.section}>
            <Group position={"apart"}>
                <Button onClick={openEditModal}>Изменить заказ</Button>
                <Button color={"red"} onClick={handleDelete}>Удалить</Button>
            </Group>
        </Card.Section>
    </Card>
}