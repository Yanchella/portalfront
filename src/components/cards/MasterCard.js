import React from 'react';
import {ActionIcon, Badge, Button, Card, createStyles, Group, Image, Menu, Text, Tooltip} from '@mantine/core';
import {ChevronDown, Pencil, Trash} from 'tabler-icons-react';
import {useDispatch} from "react-redux";
import {BASE_API_URL} from "../../constants/baseApiUrl";
import {useModals} from "@mantine/modals";
import {MasterForm} from "../forms/MasterForm";
import {deleteMaster} from "../../app/slices/mastersSlice";
import {OrderForm} from "../forms/OrderForm";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    label: {
        marginBottom: theme.spacing.xs,
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

    button: {
        paddingRight: 0,
        width: "100%",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: theme.radius.xl,
        borderBottomLeftRadius: theme.radius.xl,
    },

    menuControl: {
        borderTopRightRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

export function MasterCard({master, isAdmin = false}) {
    const {classes, theme} = useStyles();
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];
    const dispatch = useDispatch()
    const modals = useModals()

    const openEditModal = (e) => {
        modals.openModal({
            title: "Изменение мастера",
            children: <MasterForm master={master}/>
        })
    }

    const handleDelete = (e) => {
        dispatch(deleteMaster({id: master.id}))
    }

    const openOrderModal = () => {
        modals.openModal({
            title: "Запись на услугу",
            children: <OrderForm masterId={master.id}/>
        })
    }

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
                <Image src={master.photoId ? BASE_API_URL + "/images/" + master.photoId : null} height={180}
                       withPlaceholder alt={"Toy Image"}/>
            </Card.Section>

            <Group position="apart" my="md">
                <div>
                    <Text weight={500}>{master.name}</Text>
                    <Text size="xs" color="dimmed">
                        {master.bio}
                    </Text>
                </div>
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text size="sm" color="dimmed" className={classes.label}>
                    Оказываемые услуги
                </Text>

                <Group spacing={8} mb={-8}>
                    {master.services.map(service => (
                        <Tooltip label={service.description} key={service.id}>
                            <Badge>{service.title}</Badge>
                        </Tooltip>
                    ))}
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group spacing={30}>
                    {!isAdmin && <Button onClick={openOrderModal} radius="xl" style={{flex: 1}}>
                        Записаться
                    </Button>}
                    {isAdmin && <Group noWrap spacing={0} sx={{flex: 1}}>
                        <Button onClick={openOrderModal} className={classes.button}>Записаться</Button>
                        <Menu
                            control={
                                <ActionIcon
                                    variant="filled"
                                    color={theme.primaryColor}
                                    size={36}
                                    className={classes.menuControl}
                                >
                                    <ChevronDown size={16}/>
                                </ActionIcon>
                            }
                            transition="pop"
                            placement="end"
                        >
                            <Menu.Item onClick={openEditModal} icon={<Pencil size={16} color={menuIconColor}/>}>
                                Изменить
                            </Menu.Item>
                            <Menu.Item onClick={handleDelete}
                                       icon={<Trash size={16} color={"red"}/>}>Удалить</Menu.Item>
                        </Menu>
                    </Group>}
                </Group>
            </Card.Section>
        </Card>
    );
}