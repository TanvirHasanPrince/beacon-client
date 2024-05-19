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
      date: new Date(journal.date).toISOString(), // Ensure date is in ISO format
      sentiment: sentimentMapping[journal.sentimentResult],
    })
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Sentiment Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(new Date(str), "MMMM do")}
            axisLine={true}
            tickLine={false}
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
          />
          <Tooltip
            labelFormatter={(label) => format(new Date(label), "MMMM do, yyyy")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#8884d8"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentAnalysisChart;
