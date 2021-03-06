import React from 'react';
import {Anchor, Burger, Container, createStyles, Group, Header, Menu, Text, Title, Tooltip} from '@mantine/core';
import {useToggle} from '@mantine/hooks';
import {Logout, Scissors, Settings} from 'tabler-icons-react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, userSelector} from "../../app/slices/userSlice";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    right: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            textDecoration: "none",
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));


export function HeaderWithNav() {
    const {classes, cx} = useStyles();
    const dispatch = useDispatch()

    const {isSuccess, username, isAdmin} = useSelector(userSelector);

    return (
        <Header height={56}>
            <Container className={classes.inner}>
                <Group className={classes.links} spacing={5}>
                    <Anchor
                        component={Link}
                        to={"/"}
                        className={cx(classes.link, {[classes.linkActive]: false})}
                    >
                        ??????????????
                    </Anchor>
                    <Anchor
                        component={Link}
                        to={"/catalog"}
                        className={cx(classes.link, {[classes.linkActive]: false})}
                    >
                        ??????????????
                    </Anchor>
                    <Anchor
                        component={Link}
                        to={"/about"}
                        className={cx(classes.link, {[classes.linkActive]: false})}
                    >
                        ?? ??????
                    </Anchor>
                </Group>

                <Group>
                    <Scissors size={36}/>
                    <Title order={2}>Beauty</Title>
                </Group>

                <Group className={classes.right} position="right" noWrap>
                    {!isSuccess ? <>
                        <Anchor component={Link} to={"/signin"}>????????</Anchor>
                        <Anchor component={Link} to={"/signup"}>??????????????????????</Anchor>
                    </> : <>
                        <Menu
                            sx={{cursor: "pointer"}}
                            size={260}
                            placement="end"
                            transition="pop-top-right"
                            control={
                                <Tooltip label={"???????? ????????????????????????"} position={"left"} withArrow>
                                    <Text size={"md"}>{username}</Text>
                                </Tooltip>
                            }
                        >
                            {isAdmin && <>
                                <Menu.Label>??????????????????????????</Menu.Label>
                                <Menu.Item component={Link} to="/orders" icon={<Settings size={14}/>}>
                                    ????????????
                                </Menu.Item>
                            </>}
                            <Menu.Label>??????????????????</Menu.Label>
                            <Menu.Item component={Link} to="/account" icon={<Settings size={14}/>}>
                                ?????????????????? ????????????????
                            </Menu.Item>
                            <Menu.Item onClick={() => {
                                localStorage.removeItem("accessToken")
                                dispatch(logoutUser())
                            }} icon={<Logout size={14}/>}>??????????</Menu.Item>
                        </Menu>
                    </>}
                </Group>
            </Container>
        </Header>
    );
}