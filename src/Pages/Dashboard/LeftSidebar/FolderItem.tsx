import ThreeDot from "@/assets/images/three_dot.svg";
import RightArrow from "@/assets/images/right_arrow.svg";
import { useEffect, useRef, useState } from "react";
import { Dropdown,Modal } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";


export const FolderItem = ({ folderName, children }) => {
  const [opened, setOpened] = useState(false);

  const dropDownButton = useRef(null);
  const dropDownMenu = useRef(null);
  
  const onClickCreateFolder = () => {
    const modal = new Modal(document.getElementById("createFolder"));
    modal.show();
  }

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl: HTMLElement = dropDownMenu.current

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = dropDownButton.current

     // Ensure elements are not null
  if (!$targetEl || !$triggerEl) {
    console.error('Elements not found');
    return;
  }

    // options with default values
    const options: DropdownOptions = {
      placement: "bottom",
      triggerType: "click",
      offsetSkidding: 0,
      offsetDistance: 0,
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: "dropdownMenu",
      override: false,
    };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     * instanceOptions: optional
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dropdown: DropdownInterface = new Dropdown(
      $targetEl,
      $triggerEl,
      options,
      instanceOptions
    );
  }, []);
  
  return (
    <>
      <div className="flex items-center w-full">
        <button
          className="p-button h-[32px] hover:bg-gray-100 rounded pl-[5px] pr-[5px] p-component p-button-icon-only p-button-text p-button-sm p-button-secondary"
          onClick={() => setOpened(!opened)}
        >
          <img
            src={RightArrow}
            alt=""
            className={`h-[14px] w-[14px] transition-all ease-in-out duration-75 ${opened ? "" : "-rotate-90"}`}
          />
        </button>
        <div
          className="p-splitbutton h-[32px] w-full p-component p-button-secondary p-button-text p-button-sm"
          title="zxcv"
          data-pc-name="splitbutton"
          data-pc-section="root"
          id="pr_id_120"
        >
          <button
            aria-label="zxcv"
            className="p-button hover:bg-gray-100 rounded p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap text-left gap-[7px] pl-[5px] pr-[5px] font-normal"
            onClick={() => setOpened(!opened)}
          >
            <span className="p-button-label p-c" data-pc-section="label">
              {folderName}
            </span>
          </button>
          <button
            className="px-2 rounded p-button hover:bg-gray-100 p-component p-splitbutton-menubutton p-button-icon-only"
            type="button"
            aria-expanded="false"
            aria-haspopup="true"
            data-pc-name="button"
            ref={dropDownButton}
            data-pc-section="root"
          >
            <img src={ThreeDot} alt="" className=" w-1 py-[7px]" />
          </button>
          <div
            ref={dropDownMenu}
            className="z-10 hidden py-1 bg-white divide-y divide-gray-100 rounded-lg [box-shadow:0_2px_12px_0_rgba(0,0,0,.1)] w-44 dark:bg-gray-700"
          >
            <div
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200"
              onClick={()=> onClickCreateFolder()}
            >
             Add Documents
            </div>
            <div
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200"
              onClick={()=> onClickCreateFolder()}
            >
             Delete
            </div>
          </div>
        </div>
      </div>
      {opened && (
        <div className="p-1 mx-1 mt-1 space-y-2 bg-slate-100">
          {children ? children : "No Documents"}
        </div>
      )}
    </>
  );
};
