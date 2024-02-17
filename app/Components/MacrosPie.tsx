import { PieChart, Pie, Cell, LabelList } from "recharts";

interface IMacroDistributionInGrams {
  macroDistributionInGrams: {
    value: number;
    label: string;
    fill: string;
  }[];
}

export function MacroPie({
  macroDistributionInGrams,
}: IMacroDistributionInGrams) {
  const renderLabel = (piePiece: any) => {
    return piePiece.label;
  };

  const renderValue = (piePiece: any) => {
    return piePiece.value;
  };

  const renderFill = (piePiece: any) => {
    return piePiece.fill;
  };

  return (
    <div className="mt-4 pb-8">
      <PieChart width={900} height={150}>
        <Pie
          data={macroDistributionInGrams}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="100%"
          outerRadius={100}
          label={renderLabel}
          startAngle={180}
          endAngle={0}
        ></Pie>
      </PieChart>
    </div>
  );
}
