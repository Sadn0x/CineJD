import AccountStats from "./Components/AccountStats";
import AccountDetails from "./Components/AccoutDetails";
import ActiveRewards from "./Components/ActiveRewards";
import RecentlySeen from "./Components/RecentlySeen";
import RewardsProgress from "./Components/RewardsProgress";

export function Account() {
  return (
    <div className="pb-10">
      <div className="flex justify-center items-center h-screen mt-10 mb-10">
        <div className="w-96 min-w-80 h-screen">
          <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">My Account</h1>

          <AccountStats />
          <RewardsProgress />
          <ActiveRewards />
          <RecentlySeen />
          <AccountDetails />
          
          
        </div>
      </div>
    </div>
  );
}
