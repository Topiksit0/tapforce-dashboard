import React from 'react'
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
    Grid,
} from "@tremor/react";

const chartdata = [
    {
        date: "Jan 22",
        SemiAnalysis: 2890,
        "The Pragmatic Engineer": 2338,
    },
    {
        date: "Feb 22",
        SemiAnalysis: 2756,
        "The Pragmatic Engineer": 2103,
    },
    {
        date: "Mar 22",
        SemiAnalysis: 3322,
        "The Pragmatic Engineer": 2194,
    },
    {
        date: "Apr 22",
        SemiAnalysis: 3470,
        "The Pragmatic Engineer": 2108,
    },
    {
        date: "May 22",
        SemiAnalysis: 3475,
        "The Pragmatic Engineer": 1812,
    },
    {
        date: "Jun 22",
        SemiAnalysis: 3129,
        "The Pragmatic Engineer": 1726,
    },
];

const colors: { [key: string]: Color } = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
};

const categories: {
    title: string;
    metric: string;
    metricPrev: string;
    delta: string;
    deltaType: DeltaType;
}[] = [
        {
            title: "Puntos",
            metric: "$ 12,699",
            metricPrev: "$ 9,456",
            delta: "34.3%",
            deltaType: "moderateIncrease",
        },
        {
            title: "Mekas",
            metric: "$ 40,598",
            metricPrev: "$ 45,564",
            delta: "10.9%",
            deltaType: "moderateDecrease",
        },
        {
            title: "Posición",
            metric: "1,072",
            metricPrev: "856",
            delta: "25.3%",
            deltaType: "moderateIncrease",
        },
    ];

const salesPeople: {
    name: string;
    leads: number;
    sales: string;
    quota: string;
    variance: string;
    region: string;
    delta: string;
    deltaType: DeltaType;
}[] = [
        {
            name: "Peter Doe",
            leads: 45,
            sales: "1,000,000",
            quota: "1,200,000",
            variance: "low",
            region: "Region A",
            delta: "overperforming",
            deltaType: "moderateIncrease",
        },
        {
            name: "Lena Whitehouse",
            leads: 35,
            sales: "900,000",
            quota: "1,000,000",
            variance: "low",
            region: "Region B",
            delta: "average",
            deltaType: "unchanged",
        },
        {
            name: "Phil Less",
            leads: 52,
            sales: "930,000",
            quota: "1,000,000",
            variance: "medium",
            region: "Region C",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        },
        {
            name: "John Camper",
            leads: 22,
            sales: "390,000",
            quota: "250,000",
            variance: "low",
            region: "Region A",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Max Balmoore",
            leads: 49,
            sales: "860,000",
            quota: "750,000",
            variance: "low",
            region: "Region B",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Peter Moore",
            leads: 82,
            sales: "1,460,000",
            quota: "1,500,000",
            variance: "low",
            region: "Region A",
            delta: "average",
            deltaType: "unchanged",
        },
        {
            name: "Joe Sachs",
            leads: 49,
            sales: "1,230,000",
            quota: "1,800,000",
            variance: "medium",
            region: "Region B",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        },
        {
            name: "Phil Less",
            leads: 52,
            sales: "930,000",
            quota: "1,000,000",
            variance: "medium",
            region: "Region C",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        },
        {
            name: "John Camper",
            leads: 22,
            sales: "390,000",
            quota: "250,000",
            variance: "low",
            region: "Region A",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Max Balmoore",
            leads: 49,
            sales: "860,000",
            quota: "750,000",
            variance: "low",
            region: "Region B",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Peter Moore",
            leads: 82,
            sales: "1,460,000",
            quota: "1,500,000",
            variance: "low",
            region: "Region A",
            delta: "average",
            deltaType: "unchanged",
        },
        {
            name: "Joe Sachs",
            leads: 49,
            sales: "1,230,000",
            quota: "1,800,000",
            variance: "medium",
            region: "Region B",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        },
        {
            name: "Phil Less",
            leads: 52,
            sales: "930,000",
            quota: "1,000,000",
            variance: "medium",
            region: "Region C",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        },
        {
            name: "John Camper",
            leads: 22,
            sales: "390,000",
            quota: "250,000",
            variance: "low",
            region: "Region A",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Max Balmoore",
            leads: 49,
            sales: "860,000",
            quota: "750,000",
            variance: "low",
            region: "Region B",
            delta: "overperforming",
            deltaType: "increase",
        },
        {
            name: "Peter Moore",
            leads: 82,
            sales: "1,460,000",
            quota: "1,500,000",
            variance: "low",
            region: "Region A",
            delta: "average",
            deltaType: "unchanged",
        },
        {
            name: "Joe Sachs",
            leads: 49,
            sales: "1,230,000",
            quota: "1,800,000",
            variance: "medium",
            region: "Region B",
            delta: "underperforming",
            deltaType: "moderateDecrease",
        }
    ];
const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};

function Overview() {
    return (
        <div className=' pl-6 pb-4 pt-12 grow sm:grid sm:grid-cols-2 gap-6 mr-6 h-screen'>
            <div className='col-span-1 '>
                <div className='flex flex-wrap sm:flex-nowrap  space-x-0 sm:space-x-5 justify-between'>
                    {categories.map((item) => (
                        <Card key={item.title} className='sm:my-0 my-3'>
                            <Text>{item.title}</Text>
                            <Flex
                                justifyContent="start"
                                alignItems="baseline"
                                className="truncate space-x-3"
                            >
                                <Metric>{item.metric}</Metric>
                                <Text className="truncate">from {item.metricPrev}</Text>
                            </Flex>
                            <Flex justifyContent="start" className="space-x-2  mt-4">
                                <BadgeDelta deltaType={item.deltaType} />
                                <Flex justifyContent="start" className="space-x-1 truncate">
                                    <Text color={colors[item.deltaType]}>{item.delta}</Text>
                                    <Text className="truncate"> to previous month </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}

                </div>
                <div className='mt-5'>
                    <Card>
                        <Title>Puntuación </Title>
                        <AreaChart
                            className="h-72 mt-4"
                            data={chartdata}
                            index="date"
                            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                            colors={["indigo", "cyan"]}
                            valueFormatter={dataFormatter}
                        />
                    </Card>


                </div>

                <div className='mt-5'>
                    <Card>
                        <Title>Posición  </Title>
                        <AreaChart
                            className="h-72 mt-4"
                            data={chartdata}
                            index="date"
                            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                            colors={["indigo", "cyan"]}
                            valueFormatter={dataFormatter}
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
                            <TableHeaderCell className="text-right"> Status </TableHeaderCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {salesPeople.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.name}</TableCell>
                                <TableCell className="text-right">{item.leads}</TableCell>
                                <TableCell className="text-right">{item.variance}</TableCell>
                                <TableCell className="text-right">{item.region}</TableCell>
                                <TableCell className="text-right">
                                    <BadgeDelta deltaType={item.deltaType} size="xs">
                                        {item.delta}
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