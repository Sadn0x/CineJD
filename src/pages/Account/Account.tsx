import AccountStats from "./Components/AccountStats";
import AccountDetails from "./Components/AccoutDetails";
import ActiveRewards from "./Components/ActiveRewards";
import RecentlySeen from "./Components/RecentlySeen";
import RewardsProgress from "./Components/RewardsProgress";

export function Account() {
  return (
    <div className="">
      <div className="flex justify-center items-center h-screen mt-10">
        <div className="w-9/12 min-w-80 h-screen">
          <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">My Account</h1>

          <AccountStats />
          <RewardsProgress />
          <ActiveRewards />
          <RecentlySeen />
          <AccountDetails />
          <div className="h-20" />
        </div>
      </div>
      
    </div>
  );
}
