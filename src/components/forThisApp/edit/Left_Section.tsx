import { Card, Touchable } from "@/components/generic";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Left_Section = () => {
  return (
    <div className="flex flex-1 flex-col border-r border-neutral-800 p-4">
      <div className="w-full mb-4">
        <Card title="Section selected">
          <div className="flex p-2 items-center justify-center">
            <Touchable>
              <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
            </Touchable>
            <p className="text-lg font-bold">Checkbox list - Today</p>
            <Touchable>
              <ChevronRightIcon color="gray" className={IconStyleClassNames} />
            </Touchable>
          </div>
        </Card>
      </div>
      <Card title="Field to edit">
        <p>field to edit</p>
      </Card>
      <Touchable className="flex rounded-md mt-4 p-2 w-full items-center justify-center bg-green-800">
        <p>Save</p>
      </Touchable>
    </div>
  );
};

const IconStyleClassNames = "ml-2 h-6 w-6 mr-2";
