import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function AccountDetails() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ borderColor: "#383838" }}
      className="pl-10 pr-10 border-t pt-5 pb-5 flex justify-between"
    >
      <h2 className="font-bold">Account Details</h2>
      <div className="flex flex-col">
        <button className="text-left text-blue-600" onClick={handleOpen}>Update email</button>
        <button className="text-left text-blue-600" onClick={handleOpen}>Change password</button>
        
        <button className="text-left text-red-600" onClick={handleOpen}>
          Delete account
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box className="bg-gray-900 rounded-lg p-4 w-72 space-y-7" sx={{ ...style }}>
            <h2 className="font-bold">
              Are you sure?
            </h2>
            <div className="flex justify-between">
              <button className="text-white p-2 pl-10 pr-10 border rounded-md hover:bg-gray-500" onClick={handleClose}>Yes</button>
              <button className="text-red-700 p-2 pl-10 pr-10 border border-red-700 rounded-md hover:bg-red-900 hover:text-gray-900" onClick={handleClose}>No</button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AccountDetails;
