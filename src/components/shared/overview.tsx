import React from 'react'
import { useEffect, useState } from 'react';

import { getCategoriesData } from '../../lib/dataHandler'
import { getChartPuntuacionData } from '../../lib/dataHandler'
import { getChartPosicionData } from '../../lib/dataHandler'
import { getUserlistData } from '../../lib/dataHandler'



import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
    DeltaType,
    Text,
    Metric,
    Title,
    AreaChart,
    Flex,
    Color,
    XAxis, YAxis, CartesianGrid, Tooltip,
    Grid,
} from "@tremor/react";

const chartdata = [
    {
        date: "Jan 22",
        SemiAnalysis: 2890
    },
    {
        date: "Feb 22",
        SemiAnalysis: 2756
    }
];

const colors: { [key: string]: Color } = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
};


const dataFormatter = (number: number) => {
    return "" + Intl.NumberFormat("us").format(number).toString();
};

function Overview() {
    const [categories, setCategories] = useState([]);
    const [charPuntuacion, setCharPuntuacion] = useState([]);
    const [charPosicion, setCharPosicion] = useState([]);
    const [UserlistData, setUserlistData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategoriesData();
            setCategories(categoriesData);
        };

        const fetchCharPuntuacion = async () => {
            const charPuntuacion = await getChartPuntuacionData();
            setCharPuntuacion(charPuntuacion);
        };

        const fetchCharPosicion = async () => {
            const charPosicion = await getChartPosicionData();
            setCharPosicion(charPosicion);
        };

        const fetchUserlistData = async () => {
            const UserlistData = await getUserlistData();
            setUserlistData(UserlistData);
        };


        fetchCategories();
        fetchCharPuntuacion();
        fetchCharPosicion();
        fetchUserlistData();
    }, []);

    function renderCategories(categoryData: any) {
        return (
            <Card key={categoryData.title} className='sm:my-0 my-3'>
                <Text>{categoryData.title}</Text>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >
                    <Metric>{categoryData.metric}</Metric>
                    <Text className="truncate">from {categoryData.metricPrev}</Text>
                </Flex>
                <Flex justifyContent="start" className="space-x-2  mt-4">
                    <BadgeDelta deltaType={categoryData.deltaType} />
                    <Flex justifyContent="start" className="space-x-1 truncate">
                        <Text color={colors[categoryData.deltaType]}>{categoryData.delta}</Text>
                        <Text className="truncate"> to previous week </Text>
                    </Flex>
                </Flex>
            </Card>
        );

    }

    return (
        <div className=' pl-6 pb-4 pt-12 grow sm:grid sm:grid-cols-2 gap-6 mr-6 h-screen'>
            <div className='col-span-1 '>
                <div className='flex flex-wrap sm:flex-nowrap  space-x-0 sm:space-x-5 justify-between'>
                    {categories.map(renderCategories)}
                </div>
                <div className='mt-5'>
                    <Card>
                        <Title>Puntuación </Title>
                        <AreaChart
                            className="h-72 mt-4"
                            data={charPuntuacion}
                            index="date"
                            categories={["Recaudadores"]}
                            colors={["indigo"]}
                            valueFormatter={dataFormatter}
                        />
                    </Card>


                </div>

                <div className='mt-5'>
                    <Card>
                        <Title>Mekas Matados  </Title>
                        
                        <AreaChart
                            className="h-72 mt-4"
                            data={charPosicion}
                            index="date"
                            categories={["Recaudadores"]}
                            colors={["indigo"]}
                            valueFormatter={dataFormatter}
                            curveType="step"
                        />
                        
                    </Card>


                </div>
            </div>


            <Card className='  overflow-auto'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell > Posición </TableHeaderCell>
                            <TableHeaderCell className='text-right'> Name </TableHeaderCell>
                            <TableHeaderCell className="text-right"> Mekas </TableHeaderCell>
                            <TableHeaderCell className="text-right"> Puntos </TableHeaderCell>
                            <TableHeaderCell className="text-right"> Mejora </TableHeaderCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {UserlistData.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.posicion}</TableCell>
                                <TableCell className="text-right">{item.username}</TableCell>
                                <TableCell className="text-right">{item.encontrados}</TableCell>
                                <TableCell className="text-right">{item.puntos}</TableCell>
                                <TableCell className="text-right">{item.delta}</TableCell>
                                <TableCell className="text-right">
                                    <BadgeDelta deltaType={item.deltaType} size="xs">
                                        {}
                                    </BadgeDelta>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>






        </div>
    )
}

export default Overview