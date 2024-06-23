import { BoxTableProps, CursorPosition, MovementInstruction, NullableBoxData } from '@/types';
import { useEffect, useState } from 'react';
import { moveBox } from '@/apis';
import { Input } from '@chakra-ui/react'

const BOX_SIZE = 4000;
const BORDER_SIZE = 100;
const EFFECTIVE_DISTANCE = BOX_SIZE - 2 * BORDER_SIZE;

const BoxTable: React.FC<BoxTableProps> = ({ boxesData }) => {
    const [currentBox, setCurrentBox] = useState<number>(0)
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
    const [serverURL, setServerURL] = useState<string>('');

    const handleMoveCursor = async (start: number, destination: number) => {
        const { instructions, finalPosition } = calculatePath(start, destination);
        console.log(instructions);
        setCursorPosition(finalPosition);
        try {
            await moveBox(instructions)
        } catch (e) {
            console.log(e)
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
            <div>
                <Input className='text-white' placeholder='Server IP' value={serverURL} onChange={(e) => setServerURL(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
                {boxesData.map((data, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center h-24 w-24 border border-gray-300 bg-gray-100 text-black cursor-pointer"
                        onClick={() => {
                            handleMoveCursor(currentBox, index);
                            setCurrentBox(index);
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
