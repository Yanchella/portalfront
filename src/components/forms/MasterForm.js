import {useDispatch} from "react-redux";
import {Box, Button, Group, LoadingOverlay, MultiSelect, TextInput, useMantineTheme} from "@mantine/core";
import {useEffect, useState} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {dropzoneChildren} from "../Dropzone";
import {createMaster, updateMaster} from "../../app/slices/mastersSlice";
import {useForm} from "@mantine/form";
import {uploadImage} from "../../constants/functions";
import axios from "axios";
import {BASE_API_URL} from "../../constants/baseApiUrl";

export const MasterForm = ({master = null}) => {
    const dispatch = useDispatch()
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])

    useEffect(() => {
        axios.get(BASE_API_URL + "/services").then(res => {
            setServices(res.data.map(service => ({value: service.id.toString(), label: service.title})))
        })
    }, [])

    const upload = (values, photoId) => {
        const data = {
            name: values.name,
            bio: values.bio,
            services: values.services.map(Number),
            photoId,
        }

        if (!master) {
            dispatch(createMaster({payload: data}))
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        } else {
            dispatch(updateMaster({
                id: master.id,
                payload: data
            }))
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        }
    }

    const form = useForm({
        initialValues: {
            name: "",
            bio: "",
            services: [],
            photo: {
                data: '',
                file: null
            }
        }
    });

    useEffect(() => {
        if (master) {
            form.setValues({
                name: master.name,
                bio: master.bio,
                services: master.services.map(service => service.id.toString()),
                photo: {
                    data: master.photoId,
                    file: null
                }
            })
        }
    }, [master])

    const handleSubmit = (values) => {
        setLoading(true)
        if (values.photo.file) {
            uploadImage(values.photo.file).then(res => {
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
                label="Как зовут мастера?"
                placeholder="ФИО"
                {...form.getInputProps('name')}
            />

            <TextInput
                required
                label="Немного о мастере"
                placeholder="Великолепно стрижет"
                {...form.getInputProps('bio')}
            />

            <MultiSelect
                required
                label={"Услуги, которые оказывает мастер"}
                data={services}
                searchable
                clearable
                {...form.getInputProps("services")}
            />

            <Box my={"md"}>
                <Dropzone
                    onDrop={(files) => {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            form.setFieldValue('photo', {
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
                    {(status) => dropzoneChildren(status, theme, form.values.photo)}
                </Dropzone>
            </Box>
            <Group position="apart" mt="md">
                <Button type="submit">Сохранить</Button>
            </Group>
        </form>
    </Box>
}