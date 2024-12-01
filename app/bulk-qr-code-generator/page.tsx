import BulkQRCodeGenerator from "@/components/BulkQRCodeGenerator";
import FooterFull from "@/components/Footers/FooterFull";
import NavBar1 from "@/components/NavBarTW/NavBar1";

export default function page ()
{
  return (
    <div>
      <NavBar1 />
      <BulkQRCodeGenerator />
      <FooterFull />


    </div>
  )
}