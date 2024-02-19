import { Modal } from "flowbite";
import { UploadDialog } from "@/Components/UploadDialog";
import FolderGroup from "./FolderGroup";
import { FolderItem } from "./FolderItem";
import DocumentItem from "./DocumentItem";

import UploadImage from "@/assets/images/upload.svg";
import ChatIcon from "@/assets/images/chatIcon.svg";
import { useEffect } from "react";
import { CreateFolderDialog } from "@/Components/CreateFolderDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const LeftSidebar = () => {
  const uploadDocument = () => {
    const modal = new Modal(document.getElementById("uploadDocument"));
    modal.show();
  };

  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        <aside className="min-w-[300px] xl:min-w-[310px] fixed lg:relative lg:translate-x-0 bg-white top-0 left-0 z-40 w-64 h-screen transition-transform border-r shadow-r -translate-x-full ">
          <div className="flex flex-col h-full divide-y divide-solid">
            <div className="flex flex-col gap-2 p-2">
              <button
                aria-label="Upload Documents"
                className="items-center cursor-pointer  h-[35px] flex justify-between py-[0.65625rem] px-[1.09375rem] text-[#6366f1] border rounded-lg border-[#6366f1]"
                data-pc-name="button"
                data-pc-section="root"
                onClick={() => uploadDocument()}
              >
                <img
                  src={UploadImage}
                  alt=""
                  className="w-[14px] h-[14px] text-[#6366f1]"
                />
                <span
                  className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit"
                  data-pc-section="label"
                >
                  Upload Documents
                </span>
              </button>
              <button
                aria-label="Chat with All Documents"
                className="items-center bg-[#6366f1] text-white cursor-pointer  h-[35px] flex justify-between py-[0.65625rem] px-[1.09375rem]  border rounded-lg border-[#6366f1] hover:bg-[#4f46e5]"
                data-pc-name="button"
                data-pc-section="root"
              >
                <img src={ChatIcon} alt="" className="w-[14px] h-[14px]" />
                <span
                  className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit"
                  data-pc-section="label"
                >
                  Chat with All Documents
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-auto grow">
              <FolderGroup>
                {userData?.folders?.map((folder, index) => (
                  <FolderItem key={index} folderName = {folder.folderName}>
                    {folder.documents?.map((document, index) => {
                        return <DocumentItem key={index} documentName={document} />;
                    })}
                  </FolderItem>
                ))}
              </FolderGroup>
              <div>
                <div className="flex items-center w-full">
                  <button
                    className="p-button h-[32px] w-[32px] pl-[5px] pr-[5px] p-component p-button-icon-only p-button-text p-button-sm p-button-secondary"
                    data-pc-name="button"
                    data-pc-section="root"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chevron-right"
                      className="svg-inline--fa fa-chevron-right "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                      ></path>
                    </svg>
                    <span className="p-button-label p-c">&nbsp;</span>
                  </button>
                  <div
                    className="p-splitbutton p-component h-[32px] w-full p-button-secondary p-button-text p-button-sm"
                    title="All Documents"
                    data-pc-name="splitbutton"
                    data-pc-section="root"
                    id="pr_id_4"
                  >
                    <button
                      aria-label="All Documents"
                      className="p-button text-left gap-[7px] pl-[5px] pr-[5px] rounded-[3px] font-normal text-[rgb(49,_54,_57)] p-component p-splitbutton-defaultbutton w-[190px] whitespace-nowrap"
                      type="button"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="file"
                        className="svg-inline--fa fa-file "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                        ></path>
                      </svg>
                      <span
                        className="p-button-label p-c"
                        data-pc-section="label"
                      >
                        All Documents
                      </span>
                    </button>
                    <button
                      className="p-button p-component p-splitbutton-menubutton pl-[5px] pr-[5px] w-[30px] rounded-[3px] p-button-icon-only"
                      type="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      data-pc-name="button"
                      data-pc-section="root"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ellipsis-vertical"
                        className="svg-inline--fa fa-ellipsis-vertical "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                        ></path>
                      </svg>
                      <span className="p-button-label p-c">&nbsp;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <nav className="h-[50px] w-full bg-white fixed lg:hidden flex px-3 items-center justify-end border-b z-30">
          <button
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center px-2 py-1 text-sm text-gray-700 rounded-sm h-fit focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="svg-inline--fa fa-bars "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
      <UploadDialog />
      <CreateFolderDialog />
    </>
  );
};
