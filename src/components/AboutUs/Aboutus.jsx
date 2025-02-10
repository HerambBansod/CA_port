 
import './Aboutus.css'
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";


export default function Aboutus() {
    return (
        <>  
       <div className="custom-container">
        <div className="aboutus-left">
            <img src="https://caportal.saginfotech.com/caportal/ca-template-94/images/about.jpg" alt="" />
            <div className="about-achivement">
                <img src="https://caportal.saginfotech.com/caportal/ca-template-94/images/award.png" alt="" />
                
                <span>
                    30
                </span>
                <p>years   experience</p>
               
                
            </div>
        </div>
        <div className="about-right">
            <span>About us</span>

            <h1> we turn information into actionable</h1>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, ea. Beatae harum similique praesentium error exercitationem illum, totam temporibus, ex qui tempore dolores reprehenderit.</p>

           <ul>
            <li><FaCheck/> <span>valutioon service</span></li>
            <li><FaCheck/> <span>Developemnet of finance model</span></li>
           </ul>

           <button>
            get in touch <IoIosArrowRoundForward/>
           </button>
        </div>
       </div>
        </>
    )
}