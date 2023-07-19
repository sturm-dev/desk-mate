import { Card, Touchable } from "@/components/generic";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Right_Section = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="p-4 w-full">
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
      <div className="flex flex-1 w-full border-t border-neutral-800 p-4">
        <Card title="Changes preview">
          <p>preview</p>
        </Card>
      </div>
    </div>
  );
};

const IconStyleClassNames = "ml-2 h-6 w-6 mr-2";
