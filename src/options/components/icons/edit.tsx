import React from "react";

const Edit = ({ size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.2045 1.51573L14.4807 0.79158C13.9589 0.269504 13.2686 0 12.5784 0C11.8881 0 11.1979 0.269501 10.676 0.79158L0.810887 10.6611C0.6257 10.8463 0.507923 11.0821 0.474224 11.3347L0.00285264 15.36C-0.0308498 15.7137 0.238532 16 0.575202 16H0.642489L4.66598 15.5284C4.91845 15.4947 5.17105 15.3769 5.33931 15.1916L15.2044 5.32211C16.2652 4.27781 16.2652 2.57676 15.2045 1.51573ZM2.24184 10.9305L10.3562 2.81258L13.1843 5.64199L5.07 13.7599L2.24184 10.9305ZM1.61898 12.042L3.959 14.383L1.29912 14.6861L1.61898 12.042ZM14.346 4.47986L14.043 4.78296L11.2149 1.95354L11.5178 1.65044C11.804 1.36414 12.1744 1.21257 12.5616 1.21257C12.9487 1.21257 13.336 1.36413 13.6053 1.65044L14.3291 2.37459C14.6153 2.66089 14.7668 3.03143 14.7668 3.41877C14.7837 3.82301 14.6322 4.19357 14.346 4.47986Z" />
    </svg>
  );
};

export default Edit;