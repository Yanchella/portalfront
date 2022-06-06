import 'dayjs/locale/ru'
import {Block} from "../components/Block";
import {
    Box,
    Button,
    Container,
    Group,
    InputWrapper,
    Stack,
    Table,
    Text,
    TextInput,
    Title,
    Tooltip
} from "@mantine/core";
import {Layout} from "../components/layout/Layout";
import {useForm} from "@mantine/form";
import {getOrders, updateUser, userSelector} from "../app/slices/userSlice";
import {BASE_API_URL} from "../constants/baseApiUrl";
import axios from "axios";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useModals} from "@mantine/modals";
import {VerifyForm} from "../components/forms/VerifyForm";
import dayjs from "dayjs";

export const Profile = () => {
    const dispatch = useDispatch()
    const modals = useModals()
    const {email, username, emailConfirmed, orders, phone} = useSelector(userSelector)
    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            phone: ""
        }
    })

    useEffect(() => {
        form.setValues({
            email, username, phone
        })
    }, [email, phone, username])

    const resetPassword = () => {
        modals.openConfirmModal({
            title: "Смена пароля",
            labels: {confirm: 'Отправить', cancel: 'Отмена'},
            children: <Text>Вам будет выслано письмо с сылкой на смену пароля</Text>,
            onConfirm() {
                axios.post(BASE_API_URL + "/auth/forgot", {
                    email
                }).catch(console.log)
            }
        })
    }

    const startEmailConfirmation = () => {
        axios.get(BASE_API_URL + "/auth/verify", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            modals.openModal({
                title: "Подтверждение Email",
                children: <VerifyForm/>
            })
        })
    }

    const handleSubmit = (values) => {
        dispatch(updateUser({email: values.email, username: values.username, phone: values.phone}))
    }


    return <Layout>
        <Container>
            <Block>
                <Title order={3}>
                    Ваш профиль
                </Title>
            </Block>
            <Block>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Container size={"25rem"}>
                        <Stack>
                            <Group spacing={0} direction={"column"} position={"center"} grow>
                                <TextInput disabled={!username} {...form.getInputProps("email")} label={"Email"}/>
                            </Group>
                            <Group spacing={0} direction={"column"} position={"center"} grow>
                                <InputWrapper label={"Email подтвержден"} sx={{width: "100%"}}>
                                    <Box sx={{width: "100%"}}>
                                        <Tooltip label={"Нажмите для подтверждения"} sx={{width: "100%"}}
                                                 position={"left"}>
                                            <Button disabled={!username || !!emailConfirmed} sx={{width: "100%"}}
                                                    onClick={startEmailConfirmation}>
                                                <Text sx={{textAlign: "center"}}>
                                                    {emailConfirmed ? "Да" : "Нет"}
                                                </Text>
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </InputWrapper>
                            </Group>
                            <Group spacing={0} direction={"column"} position={"center"} grow>
                                <TextInput disabled={!username} {...form.getInputProps("username")}
                                           label={"Имя пользователя"}/>
                            </Group>
                            <Group spacing={0} direction={"column"} position={"center"} grow>
                                <TextInput disabled={!username} {...form.getInputProps("phone")} value={phone}
                                           label={"Номер телефона"}/>
                            </Group>
                            <Button type={"submit"} disabled={!username}>Сохранить данные</Button>
                            <Button color={"grape"} disabled={!username} onClick={resetPassword}>Изменить
                                пароль</Button>
                        </Stack>
                    </Container>
                </form>
            </Block>
            <Block>
                <Title order={3}>
                    Ваши записи
                </Title>
            </Block>
            <Block>
                <Table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Время</th>
                            <th>Мастер</th>
                            <th>Услуга</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <tr>
                            <td>
                                <Text>{dayjs(order.date).toDate().toLocaleDateString()}</Text>
                            </td>
                            <td>
                                <Text>
                                    {dayjs(order.date).toDate().toLocaleTimeString()}
                                </Text>
                            </td>
                            <td>
                                <Text>{order.master.name}</Text>
                            </td>
                            <td>
                                <Text>{order.service.title}</Text>
                                <Text>{order.service.description}</Text>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Block>
        </Container>
    </Layout>
}