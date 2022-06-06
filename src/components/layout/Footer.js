import React from 'react';
import {createStyles, Container, Group, ActionIcon, Title} from '@mantine/core';
import {BrandInstagram, Scissors} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group>
                    <Scissors size={36}/>
                    <Title order={2}>Beauty</Title>
                </Group>

                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}