import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-white shadow-lg rounded-t-lg">
                <div className="text-3xl text-blue-600 hover:text-blue-800 transition duration-200">
                    <Link to={'/currentweather'}>
                        <IoHomeOutline />
                    </Link>
                </div>
                <div className="text-3xl text-blue-600 hover:text-blue-800 transition duration-200">
                    <Link to={'/search'}>
                        <CiSearch />
                    </Link>
                </div>
            </header>


        </div>
    )
}

export default Header
