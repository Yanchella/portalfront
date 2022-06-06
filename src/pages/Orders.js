import {Block} from "../components/Block";
import {Box, Container, SimpleGrid, Title} from "@mantine/core";
import {Layout} from "../components/layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getOrders, ordersSelector} from "../app/slices/ordersSlice";
import {useEffect} from "react";
import {OrderCard} from "../components/cards/OrderCard";

export const Orders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(ordersSelector)
    useEffect(() => {
        dispatch(getOrders())
    }, [])

    return <Layout>
        <Container>
            <Block>
                <Title order={3}>
                    Все записи
                </Title>
            </Block>
            <SimpleGrid cols={3}>
                {orders.map(order => <Box key={order.id}>
                    <OrderCard order={order}/>
                </Box> )}
            </SimpleGrid>
        </Container>
    </Layout>
}