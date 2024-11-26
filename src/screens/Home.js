import React, { useEffect, useState } from 'react'  // study this for interview
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../screens/Card'
import Carousal from '../components/Carousal'
import food1 from '../food1.jpg'
import food2 from '../food2.jpg'
import food3 from '../food3.jpg'

export default function Home() {

    const [foodcatg, setfoodcatg] = useState([]) // for looping
    const [fooditem, setfooditem] = useState([]) // for looping

    const [search, setsearch] = useState('')
    let domain = process.env.REACT_APP_DOMAINURL  +process.env.REACT_APP_PORT
    console.log('__'+process.env.REACT_APP_DOMAINURL)
    const loadData = async () => {
        let response = await fetch( domain+"/api/fooddata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json()
        //console.log(response[0],response[1])

        setfooditem(response[0])
        setfoodcatg(response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar></Navbar></div>
            <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousal" style={{maxHeight:"300px"}}>

                    <div className="carousel-caption" style={{zIndex:"10"}} >
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}  onChange={(e)=>setsearch(e.target.value)} />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={food1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={food2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={food3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            </div>
            <div className='container'>
                {
                    foodcatg != []
                        ? foodcatg.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    fooditem != [] ?
                                        fooditem.filter((item) => (item.CategoryName == data.CategoryName)
                                        && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filteritems => {
                                                return (
                                                    <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card
                                                        imgsrc={filteritems.img}
                                                        foodItem={filteritems}
                                                        ></Card>
                                                    </div>
                                                )
                                            })
                                        : <div>No such data found </div>}
                            </div>)
                        }) : <div> """</div>
                }
                
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}
