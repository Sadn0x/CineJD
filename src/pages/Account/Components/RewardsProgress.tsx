import Ticket from "../assets/icon/ticket.svg";
import Ticket2 from "../assets/icon/ticket2.svg";

function RewardsProgress() {
  return (
    <div
      style={{ borderColor: "#383838" }}
      className="pl-10 pr-10 border-t pt-5 pb-5"
    >
      <h2 className="font-bold">Rewards Progress</h2>
      <div className="mt-6 flex space-x-6 flex-wrap">
        <img src={Ticket} alt="" />
        <img src={Ticket} alt="" />
        <img src={Ticket} alt="" />
        <img src={Ticket} alt="" />
        <img src={Ticket} alt="" />
      </div>
      <div className="mt-6 flex space-x-6 flex-wrap">
        <img src={Ticket} alt="" />
        <img src={Ticket} alt="" />
        <img src={Ticket2} alt="" />
        <img src={Ticket2} alt="" />
        <img src={Ticket2} alt="" />
      </div>
      <p className="mt-5 text-gray-500">
        <span className="font-bold">3</span> movies until next free ticket
      </p>
    </div>
  );
}

export default RewardsProgress;
