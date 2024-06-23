import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";

const Header = () => {
    const [isClosed, setIsClosed] = useState(true);

    const handleClose = (state: boolean) => {
        console.log(state)
        setIsClosed(state);
    }

    return (
        <Box as={motion.div}
            initial={{ 
                position: "fixed",
                top: "95%",
                left: 5
             }}
            animate={{ 
                position: "fixed",
                top: "95%",
                left: isClosed ? "2%" : "26%"
             }}
        >
            <Sidebar onCloseEvent={handleClose} />
        </Box>
    )
}

export default Header;