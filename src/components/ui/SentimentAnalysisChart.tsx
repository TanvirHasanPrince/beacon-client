import React from "react";
import { useMemberQuery } from "@/redux/api/memberApi";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface SentimentAnalysisChartProps {
  memberId: string;
}

type Sentiment =
  | "Very Positive"
  | "Positive"
  | "Neutral"
  | "Slightly Negative"
  | "Very Negative";

const SentimentAnalysisChart: React.FC<SentimentAnalysisChartProps> = ({
  memberId,
}) => {
  const { data: memberData } = useMemberQuery(memberId);
  const sentimentMapping: Record<Sentiment, number> = {
    "Very Positive": 2,
    Positive: 1,
    Neutral: 0,
    "Slightly Negative": -1,
    "Very Negative": -2,
  };

  const journals = memberData?.data.journals || [];
  const data = journals.map(
    (journal: { date: string; sentimentResult: Sentiment }) => ({
      date: new Date(journal.date).toISOString(),
      sentiment: sentimentMapping[journal.sentimentResult],
    })
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const sentiment = payload[0].payload.sentiment;
      const sentimentText = Object.entries(sentimentMapping).find(
        ([key, value]) => value === sentiment
      )?.[0];
      return (
        <div className="bg-white p-2 rounded shadow-lg">
          <p className="font-bold">{`Date: ${format(
            new Date(label),
            "MMMM do, yyyy"
          )}`}</p>
          <p className="font-semibold">{`Sentiment: ${sentimentText}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Sentiment Analysis
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(new Date(str), "MMM do")}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 500, color: "#666" }}
          />
          <YAxis
            domain={[-2, 2]}
            ticks={[-2, -1, 0, 1, 2]}
            tickFormatter={(value) => {
              const sentimentText = Object.keys(sentimentMapping).find(
                (key) => sentimentMapping[key as Sentiment] === value
              );
              return sentimentText || value;
            }}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 500, color: "#666" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              fontSize: 14,
              fontWeight: 500,
              color: "#333",
            }}
          />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ stroke: "#4f46e5", strokeWidth: 2, r: 5 }}
            activeDot={{ stroke: "#4f46e5", strokeWidth: 5, r: 8 }}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
