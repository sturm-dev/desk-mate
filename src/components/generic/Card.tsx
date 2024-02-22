export const Card = ({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) => (
  <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-800">
    <div className="border-b border-neutral-800 bg-black bg-opacity-40 p-2 px-4">
      <p className="text-sm">{title}</p>
    </div>
    <div className="flex flex-1 items-center justify-center p-2">
      {children}
    </div>
  </div>
)
