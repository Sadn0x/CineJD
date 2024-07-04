function AccountStats () {
  return (
    <div className="m-10">
      <div className="flex mt-4 justify-between">
        <h2 className="font-bold">Name</h2>
        <span className="font-thin">Hanna Kim</span>
      </div>

      <div className="flex mt-4 justify-between">
        <h2 className="font-bold">Member Since</h2>
        <span className="font-thin">July 14, 2018</span>
      </div>

      <div className="flex mt-4 justify-between">
        <h2 className="font-bold">Total Savings</h2>
        <span className="font-thin">$43.98</span>
      </div>

      <div className="flex mt-4 justify-between">
        <h2 className="font-bold">Movies Seen</h2>
        <span className="font-thin">63</span>
      </div>
    </div>
  );
}

export default AccountStats;