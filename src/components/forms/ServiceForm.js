import {useDispatch} from "react-redux";
import {Box, Button, Group, LoadingOverlay, NumberInput, TextInput, useMantineTheme} from "@mantine/core";
import {useEffect, useState} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "../Dropzone";
import {useForm} from "@mantine/form";
import {uploadImage} from "../../constants/functions";
import {createService, updateService} from "../../app/slices/servicesSlice";

export const ServiceForm = ({service = null}) => {
    const dispatch = useDispatch()
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false)

    const upload = (values, thumbnailId) => {
        const data = {
            title: values.title,
            price: values.price,
            description: values.description,
            thumbnailId,
        }

        console.log(data)

        if (!service) {
            dispatch(createService({payload: data}))
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        } else {
            dispatch(updateService({
                id: service.id,
                payload: data
            }))
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        }
    }

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            thumbnail: {
                data: '',
                file: null
            }
        }
    });

    useEffect(() => {
        if (service) {
            form.setValues({
                title: service.title,
                description: service.description,
                price: service.price,
                thumbnail: {
                    data: service.thumbnailId,
                    file: null
                }
            })
        }
    }, [service])

    const handleSubmit = (values) => {
        setLoading(true)
        if (values.thumbnail.file) {
            uploadImage(values.thumbnail.file).then(res => {
                upload(values, res.data.id)
            })
        } else {
            upload(values)
        }
    }

    return <Box mx="auto" sx={{maxWidth: "30rem", position: "relative"}}>
        <LoadingOverlay visible={loading}/>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                required
                label="Название услуги"
                placeholder="Стрижка"
                {...form.getInputProps('title')}
            />

            <TextInput
                required
                label="Описание услуги"
                placeholder="Короткая стрижка"
                {...form.getInputProps('description')}
            />

            <NumberInput
                required
                label={"Цена услуги"}
                placeholder={1000}
                {...form.getInputProps('price')}
            />

            <Box my={"md"}>
                <Dropzone
                    onDrop={(files) => {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            form.setFieldValue('thumbnail', {
                                data: e.target.result,
                                file: files[0]
                            })
                        }

                        reader.readAsDataURL(files[0])
                    }}
                    multiple={false}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                >
                    {(status) => dropzoneChildren(status, theme, form.values.thumbnail)}
                </Dropzone>
            </Box>
            <Group position="apart" mt="md">
                <Button type="submit">Сохранить</Button>
            </Group>
        </form>
    </Box>
}