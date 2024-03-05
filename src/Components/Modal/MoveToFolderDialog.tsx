'use client';
import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Select from "react-tailwindcss-select";
import { moveToFolder } from "@/actions/chat";

interface IOption {
  value: string;
  label: string;
}
export const MoveToFolderDialog = ({ show, setOpenModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [folderName, setFolderName] = useState<IOption>({} as IOption);
  const [options, setOptions] = useState<IOption[]>([]);
  //   const [showFolder, setShowFolder] = useState(enableFolder);

  const { userData } = useSelector((state: RootState) => state.auth);

  const onClickMove = () => {
    //   dispatch(moveToFolder({id:userData._id, folderName:folderName.value, documentName:documentName},()=>{
    //   })
  };

  const folderChangeHandler = (value) => {
    setFolderName(value);
    console.log("value:", value);
  };

  useEffect(() => {
    if (userData !== null) {
      const options = userData.folders.map((folder) => {
        return { label: folder.folderName, value: folder.folderName };
      });
      setOptions(options);
      setFolderName(options[0]);
    }
    console.log("show:", show);
  }, [show]);

  return (
    <Modal
      show={show}
      onClose={() => setOpenModal(false)}
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
        <Modal.Header>hi</Modal.Header>
      <Modal.Body>
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-5 rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                Move to Folder
              </h3>
              <button
                type="button"
                onClick={() => onClickCancel()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule={"evenodd"}
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="select-menu">
                <Select
                  value={folderName}
                  onChange={folderChangeHandler}
                  options={options}
                  primaryColor={"#6366f1"}
                />
              </div>
            </div>

            <div className="flex items-center justify-end p-6 pt-0 space-x-2 roun ded-b">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-[#6366f1] bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-white bg-[#6366f1] hover:bg-[#4f46e5] hover:border-[#4f46e5] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-[#6366f1] text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 "
                onClick={() => onClickMove()}
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
