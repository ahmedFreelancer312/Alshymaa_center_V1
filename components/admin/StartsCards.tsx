"use client";
type ICard = {
  title: string;
  value: number;
  icon?: React.ReactNode;
};

export default function StatsCards({ title, value, icon }: ICard) {
  return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <h3 className="text-2xl font-bold text-text mt-1">{value}</h3>
          </div>
          <div className="p-3 bg-background-secondary rounded-lg text-primary">{icon}</div>
        </div>
      </div>
  );
}
