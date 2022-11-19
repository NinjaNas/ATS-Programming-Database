import { useRef, useState } from "react";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";

const ContactEdit = ({id}) => {
  const [contact, setContact] = useState()
  const contactInfo = () => {
    Axios.get("/api/contact/read/", {params: {key:0, tag:id}}).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setContact(response.data[0]);
    });
  };

  useEffect(() => {
    contactInfo();
    
  }, [])

  // useEffect(() => {
  //   if (contact){
  //     // console.log(raceOther)
  //   }
  // }, [contact])



  const phoneRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const zipRef = useRef()
  const statusRef = useRef()

  return (
    <div>
      <InputForm ref={phoneRef} label="Phone Number" passedValue={contact.phone} />
      <InputForm ref={addressRef} label="Address" passedValue={contact.address} />
      <InputForm ref={cityRef} label="City" passedValue={contact.city} />
      <InputForm ref={zipRef} label="Zip" passedValue={contact.zip} />
      <Dropdown ref={statusRef} label="Address Type" passedValue={contact.status} passedOptions={{1: "Primary", 2: "Secondary", 9: "Old"}} />
    </div>
  )
}

export default ContactEdit
