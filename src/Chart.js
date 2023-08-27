import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export default function Chart({data}) {
    return(
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
            data={data}
            margin={{
                top: 10,
                left: 20,
                right: 20,
                bottom: 10
            }}
            >
                <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="종로구" fill='#82ca9d' />
            </BarChart>    
        </ResponsiveContainer>
    );
}