import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { SquareMenu } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const navItems = [
    { name: 'Điều khiển', href: '/' },
    { name: 'Dữ liệu', href: '/data' },
]

const Sidebar = ({ onCloseEvent }: { onCloseEvent: (state: boolean) => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef(null)
    const { pathname } = useRouter();

    const handleClose = () => {
        onCloseEvent(!isOpen);
        onClose();
    }

    useEffect(() => {
        onCloseEvent(!isOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
        <>
            <Button ref={btnRef} onClick={onOpen}>
                <SquareMenu />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Skrrts
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack w={'full'}>
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className="w-full text-left">
                                    <Button bg={pathname == item.href ? "gray.300" : "transparent"} w={'full'} textAlign={'left'} justifyContent="flex-start">
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </VStack>
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar;