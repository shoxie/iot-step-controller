import { Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    return (
        <>
            <Header />

            <Box as="main">
                {children}
            </Box>
        </>
    );
}