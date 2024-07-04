import HorizontalScroll from "./HorizontalScroll";

function RecentlySeen() {
  return (
    <div
      style={{ borderColor: "#383838" }}
      className="pl-10 pr-10 border-t pt-5 pb-5"
    >
      <h2 className="font-bold">Recently Seen</h2>
      <div className="mt-6 flex space-x-6 flex-wrap">
        <HorizontalScroll />
      </div>
    </div>
  );
}

export default RecentlySeen;
