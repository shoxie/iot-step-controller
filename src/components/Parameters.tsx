import { changeManualMode, dragBox, dropBox, getConfig, ignoreNonEmptySlots, moveBox } from "@/apis";
import { useDebounce } from "@/lib/useDebounce";
import {
    Box, Button, Checkbox, Flex, FormControl,
    FormLabel, HStack, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip, useToast, VStack
} from "@chakra-ui/react";
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currentBoxAtom, serverURLAtom } from "@/lib/atom";
import { useAtom } from "jotai";

function SliderThumbWithTooltip({ defaultValue, max, onCraneSliderChange }: { defaultValue: number, max: number, onCraneSliderChange?: (value: number) => void }) {
    const [sliderValue, setSliderValue] = useState(defaultValue);
    const [showTooltip, setShowTooltip] = useState(false);
    const [prevSliderValue, setPrevSliderValue] = useState(defaultValue);

    const debouncedSliderValue = useDebounce(sliderValue, 1000);

    useEffect(() => {
        if (onCraneSliderChange) {
            onCraneSliderChange(debouncedSliderValue);
        }
    }, [debouncedSliderValue]);

    const handleSliderChange = (value: number) => {
        setPrevSliderValue(sliderValue);
        setSliderValue(value);
    };

    const direction = sliderValue > prevSliderValue ? 'increased' : sliderValue < prevSliderValue ? 'decreased' : 'same';

    useEffect(() => {
        console.log(`Slider value ${direction}: ${sliderValue}`);
    }, [sliderValue]);

    return (
        <Slider
            id='slider'
            defaultValue={defaultValue}
            min={0}
            max={max}
            colorScheme='teal'
            onChange={(v) => handleSliderChange(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}

        >
            <SliderMark value={max * 25 / 100} mt='1' ml='-2.5' fontSize='sm'>
                25%
            </SliderMark>
            <SliderMark value={max * 50 / 100} mt='1' ml='-2.5' fontSize='sm'>
                50%
            </SliderMark>
            <SliderMark value={max * 75 / 100} mt='1' ml='-2.5' fontSize='sm'>
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
                label={`${sliderValue}`}
            >
                <SliderThumb />
            </Tooltip>
        </Slider>
    )
}

const Parameters = () => {
    const [serverURL, setServerURL] = useAtom(serverURLAtom);
    const [currentBox, setCurrentBox] = useAtom(currentBoxAtom);
    const [tempUrl, setTempUrl] = useState("");
    const [manualMode, setManualMode] = useState(false);
    const [ignoreNonEmptySlotsFlag, setIgnoreNonEmptySlotsFlag] = useState(false);
    const toast = useToast()

    function onCraneSliderChange(value: number) {
        console.log('craneSliderValue', value)
    }

    function setIgnoreNonEmptySlots(value: boolean) {
        ignoreNonEmptySlots(value, serverURL)
        setIgnoreNonEmptySlotsFlag(value)
    }

    function setManualModeValue(value: boolean) {
        setManualMode(value)
        changeManualMode(value, serverURL)
    }

    async function onArrowClick(direction: string) {
        switch (direction) {
            case 'up':
                moveBox([{ axis: 'y', units: 25000, direction: 0 }], serverURL)
                break;
            case 'down':
                moveBox([{ axis: 'y', units: 25000, direction: 1 }], serverURL)
                break;
            case 'left':
                moveBox([{ axis: 'x', units: 4000, direction: 0 }], serverURL)
                break;
            case 'right':
                moveBox([{ axis: 'x', units: 4000, direction: 1 }], serverURL)
                break;
            case '+':
                moveBox([{ axis: 'z', units: 86000, direction: 0 }], serverURL)
                break;
            case '-':
                moveBox([{ axis: 'z', units: 86000, direction: 1 }], serverURL)
                break;
            case 'drag':
                await dragBox(serverURL)
                break;
            case 'drop':
                await dropBox(serverURL)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (serverURL === '') {
            return;
        }
        getConfig(serverURL).then((response) => {
            console.log('data', response.data)
            setManualMode(response.data.manual_mode)
            setIgnoreNonEmptySlotsFlag(response.data.bypass_occupancy_check)
            toast({
                title: 'Config loaded',
                description: 'Manual mode: ' + response.data.manual_mode + ', Ignore non-empty slots: ' + response.data.bypass_occupancy_check,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        })
    }, [serverURL])

    return (
        <Box position={"fixed"} top={0} left={0} border={"2px"} p={5} h={"100vh"} className="max-w-80">
            <VStack alignItems={"start"} spacing={5}>
                <Box>
                    <Input className='text-white' placeholder='Server IP' value={tempUrl} onChange={(e) => setTempUrl(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setServerURL(tempUrl);
                        }
                    }} />
                </Box>
                <Box>
                    <Checkbox colorScheme='red' isChecked={manualMode} onChange={(e) => setManualModeValue(e.target.checked)}>
                        Manual mode
                    </Checkbox>
                </Box>
                <Box>
                    <Checkbox colorScheme='red' isChecked={ignoreNonEmptySlotsFlag} onChange={(e) => setIgnoreNonEmptySlots(e.target.checked)}>
                        Ignore non-empty slots
                    </Checkbox>
                </Box>
                <Box className="min-w-full">
                    <Text fontSize={"xl"} pb={5}>Image processing</Text>
                    <FormControl>
                        <VStack spacing={5} w={"100%"}>
                            <Box w={"100%"}>
                                <FormLabel>Confident threshold</FormLabel>
                                <SliderThumbWithTooltip defaultValue={50} max={100} />
                            </Box>
                            <Box w={"100%"}>
                                <FormLabel>Overlap threshold</FormLabel>
                                <SliderThumbWithTooltip defaultValue={50} max={100} />
                            </Box>
                        </VStack>
                    </FormControl>
                </Box>

                <Box className="min-w-full">
                    <Text fontSize={"xl"} pb={5}>Crane control</Text>
                    <FormControl>
                        <HStack mt={10} justify={"space-between"}>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('-')}><Minus /></Button>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('up')}><ArrowBigUp /></Button>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('+')}><Plus /></Button>
                        </HStack>
                        <HStack mt={2} justify={"center"}>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('left')}><ArrowBigLeft /></Button>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('down')}><ArrowBigDown /></Button>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('right')}><ArrowBigRight /></Button>
                        </HStack>
                        <HStack mt={10} justify={"space-between"}>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('drag')}>Drag</Button>
                            <Button colorScheme='red' variant={"solid"} onClick={() => onArrowClick('drop')}>Drop</Button>
                        </HStack>
                    </FormControl>
                </Box>
                <Flex gap={5} wrap={"wrap"}>
                    <Button colorScheme='red' variant={"solid"}>Start</Button>
                    <Button colorScheme='red' variant={"solid"}>Reset to home</Button>
                    <Button colorScheme='red' variant={"solid"}>Reset to adjust image</Button>
                </Flex>

                {/* <Box>
                    {
                        serverURL !== '' ? (
                            <>
                                <Text fontSize={"xl"} pb={5}>Camera feed</Text>
                                <Box position={"relative"} w={"17.5rem"} maxW={"20rem"} h={"300px"}>
                                    <iframe className="absolute top-0 left-0 w-full h-full" src={`http://${serverURL}:5000/video_feed`} frameBorder="0" allowFullScreen></iframe>
                                </Box>
                            </>
                        ) : <>Server is not set</>
                    }
                </Box> */}
            </VStack>
        </Box>
    )
}

export default Parameters;