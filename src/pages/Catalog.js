import {Layout} from "../components/layout/Layout";
import {Block} from "../components/Block";
import {Container, Tabs, Title} from "@mantine/core";
import {useState} from "react";
import {Services} from "./Services";
import {Masters} from "./Masters";

export const Catalog = () => {
    const [activeTab, setActiveTab] = useState(0);

    return <Layout>
        <Container>
            <Block>
                <Title order={3}>
                    Каталог
                </Title>
            </Block>
            <Block>
                <Tabs active={activeTab} onTabChange={setActiveTab}>
                    <Tabs.Tab label="Услуги">
                        <Services/>
                    </Tabs.Tab>
                    <Tabs.Tab label="Мастера">
                        <Masters/>
                    </Tabs.Tab>
                </Tabs>
            </Block>
        </Container>
    </Layout>
}