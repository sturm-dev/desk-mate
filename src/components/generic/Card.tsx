export const Card = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="border border-neutral-800 rounded-md flex flex-1 flex-col overflow-hidden">
    <div className="bg-black bg-opacity-40 p-2 px-4 border-b border-neutral-800">
      <p className="text-sm">{title}</p>
    </div>
    <div className="flex p-2 items-center justify-center">{children}</div>
  </div>
);
