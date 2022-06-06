import React from 'react';
import {createStyles, Image, Accordion, Grid, Col, Container, Title, Paper} from '@mantine/core';
import {Layout} from "../components/layout/Layout";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        width: "100%"
    },

    title: {
        marginBottom: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    item: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    },
}));

export function About() {
    const { classes } = useStyles();
    return (
        <Layout>
            <Paper sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <div className={classes.wrapper}>
                    <Container size="lg">
                        <Grid id="faq-grid" gutter={50}>
                            <Col span={12} md={6}>
                                <Image src={"/faq.svg"} alt="Frequently Asked Questions" />
                            </Col>
                            <Col span={12} md={6}>
                                <Title order={2} align="left" className={classes.title}>
                                    Часто задаваемые вопросы
                                </Title>

                                <Accordion iconPosition="right">
                                    <Accordion.Item label="Как мне изменить пароль?" className={classes.item}>
                                        Пароль можно изменить в настройках аккаунта или на странице входа
                                    </Accordion.Item>
                                    <Accordion.Item label="Можно ли создать больше одного аккаунта?" className={classes.item}>
                                        Вы можете делать практически все что угодно, пока это не влияет на компанию и сайт
                                    </Accordion.Item>
                                    <Accordion.Item
                                        label="Я хочу отменить/изменить время записи, что мне делать?"
                                        className={classes.item}
                                    >
                                        Чтобы отменить запись или перенсти на другое время, вам надо позвонить по номеру +7 (999) 888 88 88
                                    </Accordion.Item>
                                    <Accordion.Item
                                        label="Как происходит оплата?"
                                        className={classes.item}
                                    >
                                        Клиент оплачивает услугу после того, как ее оказали
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Grid>
                    </Container>
                </div>
            </Paper>
        </Layout>
    );
}