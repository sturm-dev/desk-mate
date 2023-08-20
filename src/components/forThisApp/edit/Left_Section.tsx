import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { Card, Touchable } from "@/components/generic";

import {
  HomeMiniLayout,
  SectionInterface,
  SectionsArray,
  SectionsArrayReadableName,
} from "../HomeMiniLayout";

export const Left_Section = () => {
  const [sectionSelected, setSectionSelected] = useState<SectionInterface>(
    SectionsArray[0]
  );

  const changeSectionSelected = (chevronPressed: "left" | "right") => {
    const sectionSelectedIndex = SectionsArray.findIndex(
      (section) => section === sectionSelected
    );

    if (chevronPressed === "left") {
      if (sectionSelectedIndex === 0) {
        setSectionSelected(SectionsArray[SectionsArray.length - 1]);
      } else {
        setSectionSelected(SectionsArray[sectionSelectedIndex - 1]);
      }
    } else {
      if (sectionSelectedIndex === SectionsArray.length - 1) {
        setSectionSelected(SectionsArray[0]);
      } else {
        setSectionSelected(SectionsArray[sectionSelectedIndex + 1]);
      }
    }
  };

  const getReadableName = (section: SectionInterface) => {
    const sectionIndex = SectionsArray.findIndex(
      (sectionFromArray) => sectionFromArray === section
    );

    return SectionsArrayReadableName[sectionIndex];
  };

  return (
    <div className="flex flex-1 flex-col border-r border-neutral-800 p-4">
      <div className="w-full mb-4">
        <Card title="Section selected">
          <div className="flex flex-1">
            <HomeMiniLayout
              sectionSelected={sectionSelected}
              setSectionSelected={setSectionSelected}
            />
            <div className="flex flex-1 p-2 items-center justify-center">
              <Touchable onClick={() => changeSectionSelected("left")}>
                <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
              </Touchable>
              <div className="flex justify-center w-40">
                <span
                  className="text-center"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {getReadableName(sectionSelected)}
                </span>
              </div>
              <Touchable onClick={() => changeSectionSelected("right")}>
                <ChevronRightIcon
                  color="gray"
                  className={IconStyleClassNames}
                />
              </Touchable>
            </div>
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

const IconStyleClassNames = "mx-1 h-6 w-6";
