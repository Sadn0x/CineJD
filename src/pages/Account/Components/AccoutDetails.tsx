

function AccountDetails() {
  return (
    <div
      style={{ borderColor: "#383838" }}
      className="pl-10 pr-10 border-t pt-5 pb-5 flex justify-between"
    >
      <h2 className="font-bold">Account Details</h2>
      <div className="flex flex-col">
        <button className="text-left text-blue-600">Update email</button>
        <button className="text-left text-blue-600">Change password</button>
        <button className="text-left text-red-600">Delete account</button>
      </div>
    </div>
  );
}

export default AccountDetails;