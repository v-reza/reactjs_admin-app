import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../src/assets/images/logo.png'
import '../src/assets/style.css'
import { getToken, getUser, removeUserSession } from './config/Api';
import Swal from 'sweetalert2';
import axios from 'axios';
function Dashboard(props) {
    // console.log(props.alumniList[0].users_id)
    const urlApi = "https://bursakerjasmk4.skom.id/api"
    const navigate = useNavigate()
    const body = document.querySelector("body");
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [wirausaha, setWirausaha] = useState(null)
    const [bekerja, setBekerja] = useState(null)
    const [mahasiwa, setMahasiswa] = useState(null)
    const [keseluruhan, setKeseluruhan] = useState(null)
    const inputEl = useRef("")

    const getSearchTerm = () => {
        // console.log(inputEl.current.value)
        props.searchKeyword(inputEl.current.value)
    }
    const isHere = {
        color: "#0E4BF1"
    };

    const handleLogout = () => {
        Swal.fire({ // <-- return Promise
            title: 'Anda yakin untuk logout?',
            icon: 'question',
            confirmButtonText: 'Ya',
            confirmButtonColor: '#DC004E',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            reverseButtons: true,
            focusConfirm: false,
            focusCancel: false,
            scrollbarPadding: false,
        }).then((result) => {
            if (result.isConfirmed) {
                removeUserSession()
                navigate("/login")
            }
        })
    }

    const getAlumni = async () => {
        await axios.get(urlApi + "/statistik/alumni")
            .then(response => {
                setWirausaha(response.data.data.wirausaha)
                setBekerja(response.data.data.bekerja)
                setMahasiswa(response.data.data.mahasiswa)
                setKeseluruhan(response.data.data.jumlahkeseluruhan)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        let getMode = localStorage.getItem("mode");
        if (getMode && getMode === "dark") {
            body.classList.toggle("dark");
        }
        let getStatus = localStorage.getItem("status");
        if (getStatus && getStatus === "close") {
            setToggleSidebar(true)
        }

        if (getToken() === null && getUser() === null) {
            navigate("/login")
        }
        getAlumni()
    }, [])

    const clickSidebar = () => {

        const localSidebar = localStorage.getItem("status")
        if (localSidebar && localSidebar == "close") {
            setToggleSidebar(false)
            localStorage.setItem("status", "open")
        } else {
            setToggleSidebar(true)
            localStorage.setItem("status", "close")
        }
    }

    const clickModeToggle = () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
            localStorage.setItem("mode", "dark");
        } else {
            localStorage.setItem("mode", "light");
        }
    }

    return (
        <div>
            <nav className={toggleSidebar ? 'close' : ''}>
                <div class="logo-name">
                    <div class="logo-image">
                        <img src={logo} alt="">
                        </img>
                    </div>

                    <span class="logo_name">CodingLab</span>
                </div>

                <div class="menu-items">
                    <ul class="nav-links">
                        <li><a href="#">
                            <i class="uil uil-estate" style={isHere}></i>
                            <span class="link-name" style={isHere}>Dashboard</span>
                        </a></li>
                        <li><a href="#">
                            <i class="uil uil-files-landscapes"></i>
                            <span class="link-name">Content</span>
                        </a></li>
                        <li><a href="#">
                            <i class="uil uil-chart"></i>
                            <span class="link-name">Analytics</span>
                        </a></li>
                        <li><a href="#">
                            <i class="uil uil-thumbs-up"></i>
                            <span class="link-name">Like</span>
                        </a></li>
                        <li><a href="#">
                            <i class="uil uil-comments"></i>
                            <span class="link-name">Comment</span>
                        </a></li>
                        <li><a href="#">
                            <i class="uil uil-share"></i>
                            <span class="link-name">Share</span>
                        </a></li>
                    </ul>

                    <ul class="logout-mode">
                        <li style={{ cursor: "pointer" }}><a onClick={handleLogout}>
                            <i class="uil uil-signout"></i>
                            <span class="link-name">Logout</span>
                        </a></li>

                        <li class="mode">
                            <a href="#">
                                <i class="uil uil-moon"></i>
                                <span class="link-name">Dark Mode</span>
                            </a>

                            <div class="mode-toggle" onClick={clickModeToggle}>
                                <span class="switch"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle" onClick={clickSidebar}></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..."></input>
                    </div>

                    <img src="images/profile.jpg" alt=""></img>
                </div>

                <div class="dash-content">
                    <div class="overview">
                        <div class="title">
                            <i class="uil uil-tachometer-fast-alt"></i>
                            <span class="text">Dashboard</span>
                        </div>

                        <div class="boxes">
                            <div class="box box1">
                                <i class="uil uil-user"></i>
                                <span class="text">Mahasiswa</span>
                                <span class="number">{mahasiwa}</span>
                            </div>
                            <div class="box box2">
                                <i class="uil uil-user"></i>
                                <span class="text">Wirausaha</span>
                                <span class="number">{wirausaha}</span>
                            </div>
                            <div class="box box3">
                                <i class="uil uil-user"></i>
                                <span class="text">Bekerja</span>
                                <span class="number">{bekerja}</span>
                            </div>
                        </div>
                    </div>

                    <div class="activity">
                        <div class="title">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">Data Alumni</span>

                        </div>
                        <div class="search-box-recent">
                            <i class="uil uil-search"></i>
                            <input type="text" ref={inputEl} value={props.term} onChange={getSearchTerm} placeholder="Search here..."></input>
                        </div>
                        <div class="activity-data">
                            <div class="data names">
                                <span class="data-title" >Name</span>
                                {
                                    props.alumniList.length > 0 ?
                                        props.alumniList.map(alumni => (
                                            <span class="data-list" >{alumni.user_profile ?
                                                alumni.user_profile.nama ? alumni.user_profile.nama
                                                    : 'Nama belum dibuat'
                                                : 'Profile belum dibuat'}</span>
                                        )) :
                                        <span>Alumni tidak ada</span>
                                }

                            </div>

                            {/* <div class="data email">
                                <span class="data-title">Email</span>
                                <span class="data-list">premshahi@gmail.com</span>
                                <span class="data-list">deepachand@gmail.com</span>
                                <span class="data-list">prakashhai@gmail.com</span>
                                <span class="data-list">manishachand@gmail.com</span>
                                <span class="data-list">pratimashhai@gmail.com</span>
                                <span class="data-list">manshahi@gmail.com</span>
                                <span class="data-list">ganeshchand@gmail.com</span>
                            </div>
                            <div class="data joined">
                                <span class="data-title">Joined</span>
                                <span class="data-list">2022-02-12</span>
                                <span class="data-list">2022-02-12</span>
                                <span class="data-list">2022-02-13</span>
                                <span class="data-list">2022-02-13</span>
                                <span class="data-list">2022-02-14</span>
                                <span class="data-list">2022-02-14</span>
                                <span class="data-list">2022-02-15</span>
                            </div>
                            <div class="data type">
                                <span class="data-title">Type</span>
                                <span class="data-list">New</span>
                                <span class="data-list">Member</span>
                                <span class="data-list">Member</span>
                                <span class="data-list">New</span>
                                <span class="data-list">Member</span>
                                <span class="data-list">New</span>
                                <span class="data-list">Member</span>
                            </div>
                            <div class="data status">
                                <span class="data-title">Status</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                                <span class="data-list">Liked</span>
                            </div> */}

                        </div>

                    </div>
                    <div class="pagination">
                        <a href="#">&laquo;</a>
                        <a href="#">1</a>
                        <a class="active" href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#">6</a>
                        <a href="#">&raquo;</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
