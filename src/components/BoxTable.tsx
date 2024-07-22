import { BoxTableProps, CursorPosition, MovementInstruction, NullableBoxData } from '@/types';
import { useEffect, useState } from 'react';
import { cleanup, dragBox, dropBox, moveBox } from '@/apis';
import { currentBoxAtom, serverURLAtom } from '@/lib/atom';
import { useAtom } from 'jotai';
import { useToast, Input } from '@chakra-ui/react'

const BOX_SIZE = 12500;
const BORDER_SIZE = 1000;
const EFFECTIVE_DISTANCE = BOX_SIZE - 2 * BORDER_SIZE;

const BoxTable: React.FC<BoxTableProps> = ({ boxesData }) => {
    const [currentBox, setCurrentBox] = useAtom(currentBoxAtom);
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
        x: {
            units: 0,
            direction: 0,
            axis: "x",
        }, y: {
            units: 0,
            direction: 0,
            axis: "y",
        }
    });
    const [serverURL, setServerURL] = useAtom(serverURLAtom);
    const toast = useToast()

    const handleMoveCursor = async (start: number, destination: number) => {
        if (serverURL === '') {
            toast({
                title: 'Server URL is not set',
                description: 'Please set the server URL in the parameters tab.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        const { instructions, finalPosition } = calculatePath(start, destination);
        setCursorPosition(finalPosition);
        try {
            // await dragBox()
            await moveBox(instructions, serverURL)
            // await dropBox()
            // await cleanup()

            setCurrentBox(destination);

        } catch (e: any) {
            console.log(e)

            toast({
                title: 'Error',
                description: e.response.data ?? "Unknown error",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    };

    if (boxesData.length !== 9) {
        throw new Error('boxesData prop must contain exactly 9 items.');
    }

    function calculatePath(start: number, destination: number): { instructions: MovementInstruction[], finalPosition: CursorPosition } {
        if (start < 0 || start > 8 || destination < 0 || destination > 8) {
            throw new Error('Start and destination must be between 0 and 8 inclusive.');
        }

        const startRow = Math.floor(start / 3);
        const startCol = start % 3;
        const destRow = Math.floor(destination / 3);
        const destCol = destination % 3;

        const rowDiff = destRow - startRow;
        const colDiff = destCol - startCol;

        const instructions: MovementInstruction[] = [];

        let cursorPosition: CursorPosition = {
            x: {
                units: startCol * BOX_SIZE,
                direction: 0,
                axis: "x",
            }, y: {
                units: startRow * BOX_SIZE,
                direction: 0,
                axis: "x",
            }
        };


        if (rowDiff !== 0) {
            const direction = rowDiff > 0 ? 1 : 0; // true for down, false for up
            const moveUnits = Math.abs(rowDiff) * EFFECTIVE_DISTANCE;
            instructions.push({
                axis: 'y',
                units: moveUnits,
                direction: direction,
            });
            cursorPosition.y.units += direction ? moveUnits : -moveUnits;
        }

        if (colDiff !== 0) {
            const direction = colDiff > 0 ? 1 : 0; // true for right, false for left
            const moveUnits = Math.abs(colDiff) * EFFECTIVE_DISTANCE;
            instructions.push({
                axis: 'x',
                units: moveUnits,
                direction: direction,
            });
            cursorPosition.x.units += direction ? moveUnits : -moveUnits;
        }

        return { instructions, finalPosition: cursorPosition };
    }

    useEffect(() => {
        console.log('cursorPosition', cursorPosition)
    }, [cursorPosition])

    return (
        <>
            {/* <div>
                <Input className='text-white' placeholder='Server IP' value={serverURL} onChange={(e) => setServerURL(e.target.value)} />
            </div> */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {boxesData.map((data, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-center h-24 w-24 border border-gray-300 bg-gray-100 text-black cursor-pointer ${currentBox === index ? 'border-2 border-red-500 p-1' : ''}`}
                        onClick={() => {
                            handleMoveCursor(currentBox, index);
                        }}
                    >
                        {data?.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default BoxTable;
