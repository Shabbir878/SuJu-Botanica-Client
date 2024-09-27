import { IoMailUnreadOutline } from "react-icons/io5";
import FooterImg from "../../../assets/suju.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-10 font-bold mx-auto container ">
      <div className="bg-green-50 text-green-500">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 md:px-16 py-10 ">
          <aside className="">
            <div className="flex flex-col justify-center items-center ">
              <img src={FooterImg} alt="" className="h-32" />

              {/* <p className="text-md font-semibold text-center mt-4">
            
              
              </p> */}
              <div className="text-sm font-semibold flex items-center gap-2">
                <IoMailUnreadOutline />{" "}
                <a href="mailto:suju@gmail.com">suju@gmail.com</a>
              </div>
            </div>
          </aside>

          <div className="mt-10 md:mt-0 text-center md:text-start">
            <h6 className="text-2xl font-extrabold">Legal</h6>
            <div className="flex flex-col gap-2 md:gap-0 text-center mt-2 md:text-start">
              <a href="" className="link link-hover">
                Terms of use
              </a>
              <a href="" className="link link-hover">
                Privacy policy
              </a>
            </div>
          </div>

          <div className="flex gap-6 mx-6 mt-10 md:mt-0 justify-center ">
            <a href="https://www.facebook.com/">
              <FaFacebook className="w-6 h-6"></FaFacebook>
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram className="w-6 h-6"></FaInstagram>
            </a>
            <a href="https://twitter.com/">
              <FaTwitter className="w-6 h-6"></FaTwitter>
            </a>
          </div>
        </div>
        <div className="px-10">
          <div className="flex flex-col justify-center items-center gap-2  md:pt-2">
            <h3>© 2024 SuJu Botanica</h3>
            {/* <h3>English</h3> */}
            <h3 className="text-sm font-semibold mb-10">
              Bringing Nature Home
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
