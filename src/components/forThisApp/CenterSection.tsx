export const CenterSection = () => {
  return (
    <div className="flex flex-1 border-r border-l border-neutral-800 flex-col">
      <div className="p-2 text-sm">goal: $10k usd / month</div>
      <Line />
      <div className="p-3 text-2xl">
        remember what are you doing, where you are now and how close you are to
        achieve your goal - keep going
      </div>
      <Line />
      <div>test</div>
    </div>
  );
};

const Line = () => <div className="border-b border-neutral-800" />;
