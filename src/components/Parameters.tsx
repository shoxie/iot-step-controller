import { Box, Button, Checkbox, Flex, HStack, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import Image from "next/image";

function SliderThumbWithTooltip({ defaultValue }: { defaultValue: number }) {
    const [sliderValue, setSliderValue] = useState(5)
    const [showTooltip, setShowTooltip] = useState(false)
    return (
        <Slider
            id='slider'
            defaultValue={defaultValue}
            min={0}
            max={100}
            colorScheme='teal'
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                25%
            </SliderMark>
            <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                50%
            </SliderMark>
            <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                75%
            </SliderMark>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
                hasArrow
                bg='teal.500'
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={`${sliderValue}%`}
            >
                <SliderThumb />
            </Tooltip>
        </Slider>
    )
}

const Parameters = () => {
    const [serverURL, setServerURL] = useState("")

    return (
        <Box position={"fixed"} top={0} left={0} border={"2px"} p={5} h={"100vh"} className="max-w-80">
            <VStack alignItems={"start"} spacing={5}>
                <Box>
                    <Input className='text-white' placeholder='Server IP' value={serverURL} onChange={(e) => setServerURL(e.target.value)} />
                </Box>
                <Box>
                    <Checkbox colorScheme='red' defaultChecked={false}>
                        Manual mode
                    </Checkbox>
                </Box>
                <Box className="min-w-full">
                    <Text fontSize={"xl"} pb={5}>Image processing</Text>
                    <FormControl>
                        <VStack spacing={5} w={"100%"}>
                            <Box w={"100%"}>
                                <FormLabel>Confident threshold</FormLabel>
                                <SliderThumbWithTooltip defaultValue={50} />
                            </Box>
                            <Box w={"100%"}>
                                <FormLabel>Overlap threshold</FormLabel>
                                <SliderThumbWithTooltip defaultValue={50} />
                            </Box>
                        </VStack>
                    </FormControl>
                </Box>

                <Box className="min-w-full">
                    <Text fontSize={"xl"} pb={5}>Crane control</Text>
                    <FormControl>
                        <VStack spacing={5} w={"100%"}>
                            <Box w={"100%"}>
                                <FormLabel>X axis</FormLabel>
                                <SliderThumbWithTooltip defaultValue={0} />
                            </Box>
                            <Box w={"100%"}>
                                <FormLabel>Y axis</FormLabel>
                                <SliderThumbWithTooltip defaultValue={0} />
                            </Box>
                        </VStack>
                    </FormControl>
                </Box>
                <Flex gap={5} wrap={"wrap"}>
                    <Button colorScheme='red' variant={"solid"}>Start</Button>
                    <Button colorScheme='red' variant={"solid"}>Reset to home</Button>
                    <Button colorScheme='red' variant={"solid"}>Reset to adjust image</Button>
                </Flex>

                <Box>
                    <Text fontSize={"xl"} pb={5}>Camera feed</Text>
                    <Image src={"/images/feed1.png"} alt="feed1" width={400} height={300} />
                </Box>
            </VStack>
        </Box>
    )
}

export default Parameters;