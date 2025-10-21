import { Link } from "react-router";
import { useState } from "react";

function Homepage() {
  const username = localStorage.getItem("username") || "Player";
  const [selectedMode, setSelectedMode] = useState("online");

  return (
    <>
    </> 
    );
}

export default Homepage;
