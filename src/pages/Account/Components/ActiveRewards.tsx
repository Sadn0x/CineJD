import Ticket from "../assets/icon/ticket.svg";




function ActiveRewards() {
  

  return (
    <div
      style={{ borderColor: "#383838" }}
      className="pl-10 pr-10 border-t pt-5 pb-5"
    >
      <h2 className="font-bold">Active Rewards</h2>
      <div className="mt-6 flex align-middle">
        <img src={Ticket} height={16.25} width={22.5} alt="" className="mr-5" />
        <div className="flex justify-between w-screen">
          <span className="self-center">Free Movie Ticket</span>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <button className="border rounded-lg p-1 pl-2 pr-2">
              Activate
            </button>
          </a>
        </div>
      </div>
      <div className="mt-6 flex align-middle">
        <img src={Ticket} height={16.25} width={22.5} alt="" className="mr-5" />
        <div className="flex justify-between w-screen">
          <span className="self-center">Free Birthday Popcorn</span>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <button
              
              className="border rounded-lg p-1 pl-2 pr-2"
            >
              Activate
            </button>
            
          </a>
        </div>
      </div>
    </div>
  );
}

export default ActiveRewards;
