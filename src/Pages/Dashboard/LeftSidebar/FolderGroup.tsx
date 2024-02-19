import { useEffect, useState, useRef } from "react";
import { Dropdown,Modal } from "flowbite";

import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";

import ThreeDot from "@/assets/images/three_dot.svg";
import RightArrow from "@/assets/images/right_arrow.svg";
import Folder from "@/assets/images/folder.svg";

const FolderGroup = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const folderDropDownButton = useRef(null);
  const folderDropDownMenu = useRef(null);

  const onClickCreateFolder = () => {
    const modal = new Modal(document.getElementById("createFolder"));
    modal.show();
  }

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl: HTMLElement = folderDropDownMenu.current

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = folderDropDownButton.current

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
    <div className="p-2">
      <div className="flex items-center w-full">
        <button
          className=" h-8 p-button hover:bg-gray-100 p-component p-button-icon-only p-button-text rounded p-button-sm p-button-secondary px-[5px]"
          data-pc-name="button"
          data-pc-section="root"
          onClick={() => setOpened(!opened)}
        >
          <img
            src={RightArrow}
            alt=""
            className={`h-[14px] w-[14px] transition-all ease-in-out duration-75 ${opened ? "" : "-rotate-90"}`}
          />
        </button>
        <div
          className="w-full h-8 p-splitbutton p-component p-button-secondary p-button-text p-button-sm"
          title="Folders"
          data-pc-name="splitbutton"
          data-pc-section="root"
          id="pr_id_3"
        >
          <button
            className="p-button text-left gap-[7px] px-[5px] p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap rounded-[3px] font-normal text-[rgb(49,_54,_57)] hover:bg-gray-100"
            onClick={() => setOpened(!opened)}
            type="button"
          >
            <img src={Folder} alt="" className="h-[14px] w-[14px] " />
            <span data-pc-section="label" className="text-sm ">
              Folders
            </span>
          </button>
          <button
            className="p-button  rounded-[3px] p-component p-splitbutton-menubutton p-button-icon-only hover:bg-gray-100 px-2"
            type="button"
            ref={folderDropDownButton}
          >
            <img src={ThreeDot} alt="" className=" w-1 py-[7px]" />
          </button>
          <div
            ref={folderDropDownMenu}
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg [box-shadow:0_2px_12px_0_rgba(0,0,0,.1)] w-44 dark:bg-gray-700"
          >
            <div
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200"
              onClick={()=> onClickCreateFolder()}
            >
             Create Folder
            </div>
          </div>
        </div>
      </div>
      {opened ? (
          <div className="p-1 mt-1 space-y-2 border-t border-b">{children ? children : "No Folders" }</div>
      ):""}
    </div>
  );
};

export default FolderGroup;
