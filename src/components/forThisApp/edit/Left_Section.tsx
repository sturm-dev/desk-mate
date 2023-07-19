import { Touchable } from "@/components/generic";

export const Left_Section = () => {
  return (
    <div className="flex flex-1 flex-col border-r border-neutral-800 items-center justify-center p-4">
      <div className="flex flex-1 border border-neutral-800 w-full rounded-md p-4">
        <p>field to edit</p>
      </div>
      <Touchable className="flex rounded-md mt-4 p-2 w-full items-center justify-center bg-green-800">
        <p>Save</p>
      </Touchable>
    </div>
  );
};
