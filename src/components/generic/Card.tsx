export const Card = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="border border-neutral-800 rounded-md flex flex-1 flex-col">
    <div className="bg-neutral-800 p-2 px-4">
      <p className="text-sm">{title}</p>
    </div>
    <div className="flex p-2 items-center justify-center">{children}</div>
  </div>
);
