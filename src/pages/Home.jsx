import umbrella from '../assets/umbrella.avif'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <div className='items-center justify-center text-center min-h-screen'>
                <div className='pt-10'>
                    <img src={umbrella} alt="umbrella Image" />
                    <h1 className="text-3xl font-bold">Akash Weather App</h1>
                </div>
                <div className='text-4xl flex flex-col items-center justify-center pt-10'>
                    <Link to={'/currentweather'}>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home
