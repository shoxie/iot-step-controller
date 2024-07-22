import { dragBox, dropBox, moveBox } from "@/apis";
import { useDebounce } from "@/lib/useDebounce";
import {
    Box, Button, Checkbox, Flex, FormControl,
    FormLabel, HStack, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip, VStack
} from "@chakra-ui/react";
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currentBoxAtom } from "@/lib/atom";
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
    const [serverURL, setServerURL] = useState("")
    const [currentBox, setCurrentBox] = useAtom(currentBoxAtom);

    function onCraneSliderChange(value: number) {
        console.log('craneSliderValue', value)
    }

    async function onArrowClick(direction: string) {
        switch (direction) {
            case 'up':
                moveBox([{ axis: 'y', units: 25000, direction: 0 }])
                break;
            case 'down':
                moveBox([{ axis: 'y', units: 25000, direction: 1 }])
                break;
            case 'left':
                moveBox([{ axis: 'x', units: 4000, direction: 0 }])
                break;
            case 'right':
                moveBox([{ axis: 'x', units: 4000, direction: 1 }])
                break;
            case '+':
                moveBox([{ axis: 'z', units: 86000, direction: 0 }])
                break;
            case '-':
                moveBox([{ axis: 'z', units: 86000, direction: 1 }])
                break;
            case 'drag':
                await dragBox()
                break;
            case 'drop':
                await dropBox()
                break;
            default:
                break;
        }
    }

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
                        {/* <VStack spacing={5} w={"100%"}>
                            <Box w={"100%"}>
                                <FormLabel>X axis</FormLabel>
                                <SliderThumbWithTooltip defaultValue={0} max={100} onCraneSliderChange={onCraneSliderChange} />
                            </Box>
                            <Box w={"100%"}>
                                <FormLabel>Y axis</FormLabel>
                                <SliderThumbWithTooltip defaultValue={0} max={100} onCraneSliderChange={onCraneSliderChange} />
                            </Box>
                            <Box w={"100%"}>
                                <FormLabel>Z axis</FormLabel>
                                <SliderThumbWithTooltip defaultValue={50000} max={50000} onCraneSliderChange={onCraneSliderChange} />
                            </Box>
                        </VStack> */}
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

                <Box>
                    <Text fontSize={"xl"} pb={5}>Camera feed</Text>
                    {/* <Image src={"http://192.168.35.220:5000/video_feed"} alt="feed1" width={400} height={300} />
                    <video src="http://192.168.35.220:5000/video_feed" id="video" width="640" height="480" controls autoPlay>
                        <source src="http://192.168.35.220:5000/video_feed" type="video/mpjpeg" />
                    </video> */}
                    {/* <video width={400} height={300} controls src="http://192.168.35.220:5000/video_feed"></video> */}
                    <Box position={"relative"} w={"17.5rem"} maxW={"20rem"} h={"300px"}> 
                        <iframe className="absolute top-0 left-0 w-full h-full" src="http://192.168.35.222:5000/video_feed" frameBorder="0" allowFullScreen></iframe>
                    </Box>
                </Box>
            </VStack>
        </Box>
    )
}

export default Parameters;