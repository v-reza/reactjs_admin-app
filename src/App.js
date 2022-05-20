import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Dashboard from "./Dashboard";
import axios from "axios";
import TerimaLamaran from "./components/main/TerimaLamaran";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alumniList, setAlumniList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState([])
  const [namaList, setNamaList] = useState([])
  const [notFoundNama, setNotFoundNama] = useState(null)

  const fetchAlumni = async () => {
    await axios.get("https://bursakerjasmk4.skom.id/api/alumni")
      .then(response => {
        // response.data.data.map((alumni) => (
        //   alumni.user_profile ?
        //     alumni.user_profile.nama ? setNamaList(alumni.user_profile)
        //       : notFoundNama
        //     : notFoundNama
         
        //   // console.log(namaList)
        // ))
    // console.log(response.data.data[0].user_profile.nama)
    setAlumniList(response.data.data)
  }).catch (error => {
    console.log(error)
  })
}

useEffect(() => {
  fetchAlumni();
  // console.log(namaList)
}, [])

const searchHandler = (searchTerm) => {
  // console.log(searchTerm)`
  setSearchTerm(searchTerm)
  if (searchTerm !== "") {
    // console.log(alumniList[0].user_profile?.nama)
    const newAlumniList = alumniList.filter((alumni) => {
      // console.log(alumni.user_profile?.nama)
      // {alumni.user_profile ? alumni.user_profile.nama ? setFilter(alumni.user_profile.nama) : filter : filter}
      // if (alumni.user_profile !== null) {
      //   if(alumni.user_profile.nama !== null) {
      //     // console.log(alumni.user_profile.nama)
      //     return Object.values(alumni.user_profile.nama).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      //   } else {
      //     return Object.values(alumni.user_profile).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      //   }
      // } else {
      //   return Object.values(alumni).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      // }
      // console.log(searchTerm)
      // console.log(alumni.user_profile?.nama)
      return Object.values(alumni).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(newAlumniList);
  } else {
    setSearchResults(alumniList)
  }
}
return (
  <Router>
    <Routes>
      <Route exact path="/login" element={<Auth></Auth>}></Route>
      <Route exact path="/terimalamaran" element={<TerimaLamaran></TerimaLamaran>}></Route>
      <Route exact path="/" element={<Dashboard term={searchTerm} searchKeyword={searchHandler} alumniList={searchTerm.length < 1 ? alumniList : searchResults}></Dashboard>}></Route>
    </Routes>
  </Router>
);
}

export default App;
