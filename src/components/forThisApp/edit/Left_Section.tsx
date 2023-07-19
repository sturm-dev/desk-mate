import { Card, Touchable } from "@/components/generic";

export const Left_Section = () => {
  return (
    <div className="flex flex-1 flex-col border-r border-neutral-800 p-4">
      <Card title="Field to edit">
        <p>field to edit</p>
      </Card>
      <Touchable className="flex rounded-md mt-4 p-2 w-full items-center justify-center bg-green-800">
        <p>Save</p>
      </Touchable>
    </div>
  );
};
