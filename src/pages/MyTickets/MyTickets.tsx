import RecentMovies from "./Components/RecentMovies";
import Upcoming from "./Components/Upcoming";

function MyTickets() {
  return (
      <div className="">
        <div className="flex justify-center items-center h-screen mt-10">
          <div className="max-w-screen-lg w-10/12 min-w-96 h-screen">
            <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">My Tickets</h1>
              <Upcoming />
              <RecentMovies />
            <div className="h-20" />
          </div>
        </div>
      </div>
  );
}

export default MyTickets;