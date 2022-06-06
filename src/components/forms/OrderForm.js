import 'dayjs/locale/ru';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Group, LoadingOverlay, Select, Text, TextInput, useMantineTheme} from "@mantine/core";
import {forwardRef, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {getServices, servicesSelector} from "../../app/slices/servicesSlice";
import {getMasters, mastersSelector} from "../../app/slices/mastersSlice";
import {DatePicker, TimeInput} from "@mantine/dates";
import dayjs from 'dayjs';
import {userSelector} from "../../app/slices/userSlice";
import axios from "axios";
import {BASE_API_URL} from "../../constants/baseApiUrl";
import {deleteOrder, updateOrder} from "../../app/slices/ordersSlice";
import {useModals} from "@mantine/modals";

const findInArray = (arr, id) => arr.find(item => item.id.toString() === id)

const SelectItem = forwardRef(({label, description, ...others}, ref) => {
    return <div ref={ref} {...others}>
        <Group noWrap>
            <div>
                <Text size="sm">{label}</Text>
                <Text size="xs" color="dimmed">
                    {description}
                </Text>
            </div>
        </Group>
    </div>
})

export const OrderForm = ({masterId = null, serviceId = null, order = null}) => {
    const dispatch = useDispatch()
    const modals = useModals()
    const [loading, setLoading] = useState(false)
    const masters = useSelector(mastersSelector)
    const services = useSelector(servicesSelector)

    const {phone} = useSelector(userSelector)

    useEffect(() => {
        if (!order) {
            dispatch(getMasters())
            dispatch(getServices())
        }
    }, [order])


    const upload = (values) => {
        if (order) {
            dispatch(updateOrder({id: order.id, payload: {date: values.date}}))
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        } else {
            axios.post(BASE_API_URL + "/orders", values, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        }
    }

    const form = useForm({
        initialValues: {
            serviceId: serviceId && serviceId.toString(),
            masterId: masterId && masterId.toString(),
            date: order ? dayjs(order.date).toDate() : null,
            time: order ? dayjs(order.date).toDate() : null,
            phone,
            name: "",
        }
    });

    const handleSubmit = (values) => {
        setLoading(true)
        const date = dayjs(values.date)
        const time = dayjs(values.time)
        const {time: _, ...info} = values
        upload({
            ...info,
            serviceId: Number(values.serviceId),
            masterId: Number(values.masterId),
            date: date.hour(time.hour()).minute(time.minute()).toDate()
        })
    }

    if (order) {
        return <Box mx="auto" sx={{position: "relative"}}>
            <LoadingOverlay visible={loading}/>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <DatePicker
                    required
                    locale="ru"
                    label={"Дата"}
                    minDate={dayjs(new Date()).add(1, 'days').toDate()}
                    {...form.getInputProps("date")}
                />

                <TimeInput
                    required
                    label={"Время"}
                    {...form.getInputProps("time")}
                />

                <Group position="apart" mt="md">
                    <Button type="submit">Сохранить</Button>
                </Group>
            </form>
        </Box>
    }

    return <Box mx="auto" sx={{position: "relative"}}>
        <LoadingOverlay visible={loading}/>
        <form onSubmit={form.onSubmit(handleSubmit)}>

            <TextInput
                required
                label={"Как к вам обращаться?"}
                {...form.getInputProps("name")}
            />

            <TextInput
                required
                label={"Ваш номер телефона"}
                {...form.getInputProps("phone")}
            />

            <Select
                required
                label={"Услуга"}
                clearable
                itemComponent={SelectItem}
                data={
                    form.values.masterId && !form.values.serviceId ?
                        findInArray(masters, form.values.masterId)
                            .services.map(service => ({
                                value: service.id.toString(),
                                label: service.title,
                                description: service.description
                            })
                        ) : services.map(service => ({
                            value: service.id.toString(),
                            label: service.title,
                            description: service.description
                        }))
                }
                {...form.getInputProps("serviceId")}
            />

            <Select
                required
                label={"Мастер"}
                clearable
                itemComponent={SelectItem}
                data={
                    form.values.serviceId && !form.values.masterId ?
                        findInArray(services, form.values.serviceId)
                            .masters.map(master => ({
                                value: master.id.toString(),
                                label: master.name,
                                description: master.bio
                            })
                        ) : masters.map(master => ({
                                value: master.id.toString(),
                                label: master.name,
                                description: master.bio
                            })
                        )
                }
                {...form.getInputProps("masterId")}
            />

            <DatePicker
                required
                locale="ru"
                label={"Дата"}
                minDate={dayjs(new Date()).add(1, 'days').toDate()}
                {...form.getInputProps("date")}
            />

            <TimeInput
                required
                label={"Время"}
                {...form.getInputProps("time")}
            />

            <Group position="apart" mt="md">
                <Button type="submit">Записаться</Button>
                <Text size={"xl"}>Цена: {findInArray(services, form.values.serviceId)?.price || 0}</Text>
            </Group>
        </form>
    </Box>
}