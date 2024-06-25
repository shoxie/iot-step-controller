import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import data from '@/lib/mock';

const DataPage = () => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Steps</Th>
                        <Th>Axis</Th>
                        <Th>Direction</Th>
                        <Th>Message</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.steps}</Td>
                            <Td>{item.axis}</Td>
                            <Td>{item.direction ? 'true' : 'false'}</Td>
                            <Td>{item.message}</Td>
                        </Tr>
                    ))}
                </Tbody>
                {/* <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot> */}
            </Table>
        </TableContainer>
    )
}

export default DataPage;