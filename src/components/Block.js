import {Paper} from "@mantine/core";

export const Block = ({children, ...other}) => {
    return <Paper p={"md"} shadow={"lg"} mb={"md"} {...other}>
        {children}
    </Paper>
}