import ThreeDot from "@/assets/images/three_dot.svg";
import { useEffect, useRef } from "react";
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteDocument } from "@/actions/chat";
import { loadUser } from "@/actions/auth";

const DocumentItem = ({ documentName, folderName }: {documentName:string, folderName?:string}) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const dropDownButton = useRef(null);
  const dropDownMenu = useRef(null);

  const onClickView = () => {
    console.log('View')
  }

  const onClickDelete = () => {
    const data = {
      id: userData._id,
      folderName: folderName,
      documentName: documentName,
    };
    dispatch(deleteDocument(data,()=>{
      console.log('deleted')
      dispatch(loadUser())
    }));
  }

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl: HTMLElement = dropDownMenu.current;

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = dropDownButton.current;

    // Ensure elements are not null
    if (!$targetEl || !$triggerEl) {
      console.error("Elements not found");
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
    <div className="flex items-center w-full">
      <div className="p-splitbutton p-component p-button-secondary p-button-text p-button-sm h-[32px] w-full">
        <button
          className="p-button hover:bg-gray-200 p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap text-left gap-[7px] pl-[5px] pr-[5px] rounded font-normal"
          type="button"
        >
          <span className="p-button-label p-c">{documentName}</span>
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 p-button p-component p-splitbutton-menubutton p-button-icon-only"
          ref={dropDownButton}
          type="button"
        >
          <img src={ThreeDot} alt="" className=" w-1 py-[7px]" />
        </button>
        <div
            ref={dropDownMenu}
            className="z-10 hidden py-1 bg-white divide-y divide-gray-100 rounded-lg [box-shadow:0_2px_12px_0_rgba(0,0,0,.1)] w-44 dark:bg-gray-700"
          >
            <div
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200"
              onClick={()=> onClickView()}
            >
             View
            </div>
            <div
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200"
              onClick={()=> onClickDelete()}
            >
             Delete
            </div>
          </div>
      </div>
    </div>
  );
};

export default DocumentItem;
