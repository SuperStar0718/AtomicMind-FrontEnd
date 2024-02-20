import { Modal } from "flowbite";
import { UploadDialog } from "@/Components/UploadDialog";
import FolderGroup from "./FolderGroup";
import { FolderItem } from "./FolderItem";
import DocumentItem from "./DocumentItem";

import UploadImage from "@/assets/images/upload.svg";
import ChatIcon from "@/assets/images/chatIcon.svg";
import { useEffect, useState } from "react";
import { CreateFolderDialog } from "@/Components/CreateFolderDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import DocumentGroup from "./DocumentGroup";
import { set } from "react-hook-form";

export interface IDialogProps {
  enableFolder: boolean;
  folder?: string;
}

interface IDocumentItem {
  documentName: string;
  folderName?: string;
}

export const LeftSidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [documents, setDocuments] = useState<IDocumentItem[]>([]);
  const [dialogProps, setDialogProps] = useState<IDialogProps>({
    enableFolder: false,
  });
  const uploadDocument = () => {
    setDialogProps({ enableFolder: false });
    const modal = new Modal(document.getElementById("uploadDocument"));
    modal.show();
  };

  const onClickChatAllDocument = () => {
    dispatch({type:'SET_CHAT_CONTEXT', payload:{type:'allDocuments', name:''}})
  };

  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const allDocuments:IDocumentItem[] = [];
    if (userData === null) return;
    userData.folders?.forEach((folder) => {
      folder.documents?.forEach((document) => {
        allDocuments.push({documentName:document, folderName:folder.folderName});
      });
    });
    userData.documents?.forEach((document) => {
      allDocuments.push({documentName:document});
    });
    setDocuments(allDocuments);
  }, [userData]);

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
               onClick={()=>onClickChatAllDocument()}
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
            <div className="flex flex-col overflow-auto grow">
              <FolderGroup>
                {userData?.folders?.map((folder, index) => (
                  <FolderItem
                    key={index}
                    folderName={folder.folderName}
                    setDialogOption={setDialogProps}
                  >
                    {folder.documents?.map((document, index) => {
                      return (
                        <DocumentItem
                          key={index}
                          documentName={document}
                          folderName={folder.folderName}
                        />
                      );
                    })}
                  </FolderItem>
                ))}
              </FolderGroup>
              <DocumentGroup>
                {documents.map((document, index) => {
                  return <DocumentItem key={index} documentName={document.documentName} folderName={document.folderName} />;
                })}
              </DocumentGroup>
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
      <UploadDialog {...dialogProps} />
      <CreateFolderDialog />
    </>
  );
};
