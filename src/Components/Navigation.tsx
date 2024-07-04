import { Link } from "react-router-dom";
import Discover from "../assets/icons/discover.svg";
import Ticket from "../assets/icons/ticket.svg";
import Local from "../assets/icons/local.svg";
import Account from "../assets/icons/account.svg";


const Navigation : React.FC = () => {
    return (
        <nav className="flex z-10 fixed bottom-0 right-0 bg-gray-900 w-full justify-around border-t-2 border-gray-600 p-2">
            <Link to="/" className="flex flex-col items-center">
                <img src={Discover} className="size-6"/>
                <span className="text-white">Discover</span>
            </Link>
            <Link to="/" className="flex flex-col items-center">
                <img src={Ticket} className="size-6"/>
                <span className="text-white">Ticket</span>
            </Link>
            <Link to="/theaters" className="flex flex-col items-center">
                <img src={Local} className="size-6"/>
                <span className="text-white">Theaters</span>
            </Link>
            <Link to="/Account" className="flex flex-col items-center">
                <img src={Account} className="size-6"/>
                <span className="text-white">Account</span>
            </Link>
        </nav>
    )
}

export default Navigation;