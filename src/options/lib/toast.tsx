import React from "react";
import toast, {Toaster} from "react-hot-toast";
export const MyToast = (status: any) => {
  status === "updateSuccess" && toast("✅ Successfully updated!");
  status === "updateError" && toast("❌ Failed to update!");
};
export const MyToaster = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          backgroundColor: "#101828",
          fontWeight: 500,
          fontSize: "14px",
          color: "#ffffff",
        },
      }}
    />
  );
};
