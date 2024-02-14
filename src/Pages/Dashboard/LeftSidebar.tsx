import React from "react";

export const LeftSidebar = () => {
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
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-up-from-bracket"
                  className="h-4 w-fit svg-inline--fa fa-arrow-up-from-bracket "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"
                  ></path>
                </svg>
                <span className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit" data-pc-section="label">
                  Upload Documents
                </span>
              </button>
              <button
                aria-label="Chat with All Documents"
                className="items-center bg-[#6366f1] text-white cursor-pointer  h-[35px] flex justify-between py-[0.65625rem] px-[1.09375rem]  border rounded-lg border-[#6366f1] hover:bg-[#4f46e5]"
                data-pc-name="button"
                data-pc-section="root"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="comment-dots"
                  className="h-4 w-fit svg-inline--fa fa-comment-dots"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm160-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"
                  ></path>
                </svg>
                <span className="flex items-center justify-center w-full text-sm font-semibold text-center h-fit" data-pc-section="label">
                  Chat with All Documents
                </span>
              </button>
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
    </>
  );
};
