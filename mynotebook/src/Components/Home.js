import React, { useContext } from "react";
import Addnote from "./Addnote";
import Notes from "./Notes";
const Home = (props) => {

  return (
    <div> 
    <Notes showAlert={props.showAlert}/>
</div>
  );
};

export default Home;
