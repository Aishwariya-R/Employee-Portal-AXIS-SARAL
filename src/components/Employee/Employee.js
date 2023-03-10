import React from 'react';
import styles from "./Employee.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import NavBar from '../Nav/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import Modal from '@material-ui/core/Modal';


function Employee(props) {
  const navigate = useNavigate();
  const [emp, setEmp] = useState([]);
  const [pEid, setPEid] = useState([]);
  const [pName, setPName] = useState([]);
  const [project1, setProject1] = useState({
    project: ""
  });
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [showButton, setShowButton] = useState(false);
  let role = "";
  let token = "";
  useEffect(() => {
    token = localStorage.getItem("token")
    role = localStorage.getItem("role")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

 

    axios.get(
      'http://localhost:8093/api/test/employees',
    
      config
    ).then((response) => {
      setEmp(response.data);
    });
    axios.get(
      'http://localhost:8093/api/test/projects',
     
      config
    ).then((response) => {
      setPName(response.data);
    });

    if (role === "ROLE_ADMIN") {
      setShowButton(true)
    } else {

      setShowButton(false)
    }


  }, []);

  function postProject(e) {
    e.preventDefault();
    console.log(project1)

    axios
      .post(`http://localhost:8093/api/test/emp/update/${pEid}`, project1)
      .then((response) => {
        console.log(response.data);
        alert("Employee Added to project successfully!!!");

      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  }
  console.log(pName)
  const handleClose = () => {
    setOpen(false);
  };

  const [searchEmployee, setSearchEmployee] = useState("");


  return (
    <div>
      <NavBar />
      <div className={styles.display}>
        <div className="container p-0">
          <div class="container-fluid h-100">
            <div class="column d-flex justify-content-right align-items-right h-100">
              <div class="col-md-12 col-lg-12 col-xl-12 offset-xl-1">
                <div className={"card shadow " + styles.cardSetup}>
                  <div className={"card-header " + styles.headerCrd}>
                    <div className={"text-center " + styles.eheading}>
                      <p className='headingEmployee'> Employees </p>
                      <input
                        className="search1"
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => {
                          setSearchEmployee(event.target.value);
                        }}
                      />

                    </div>

                    {showButton &&
                      <Dropdown>
                        <Dropdown.Toggle className={styles.btnbg} >
                          Edit Options
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#" onClick={(e) => { navigate("/addEmployee") }} >
                            Add Employee
                          </Dropdown.Item>
                          <Dropdown.Item href="#" onClick={() => {
                            setOpen(true);
                            // setModalData(item);
                          }}>
                            Assign Project
                          </Dropdown.Item>
                          <Dropdown.Item href="#">
                            Change Role
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                  </div>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                  >
                    <div style={{ outline: 'none' }} className={styles.model}>
                      <div className={styles.displaymodel}>
                        <div className="container p-0">
                          <div class="container-fluid h-100">
                            <div class="column d-flex justify-content-center align-items-center h-100">
                              <div class="col-md-12 col-lg-12 col-xl-12 offset-xl-1">
                                <div className={"card shadow " + styles.cardSetup}>
                                  <div className={"card-header " + styles.headerCrd}>
                                    <div className={"text-center " + styles.eheading}>Assign Project</div>
                                  </div>


                                  <div
                                    className={"card-body " + styles.cardBody}
                                    data-bs-spy="scroll"
                                    data-bs-target="#navbar-example"
                                  >
                                    <label className={styles.label}>
                                      <div className="text-left mt-1 mb-1 pb-1 ">

                                        Project Name
                                      </div>
                                      <div className="form-outline mb-4  ">

                                        <select className="sinput"
                                          value={project1.project}
                                          onChange={(e) =>
                                            setProject1({ ...project1, project: e.target.value })
                                          }
                                        >
                                          {pName.map((item, index) => (
                                            <option value={item.projName}>{item.projName}</option>))}


                                        </select>
                                      </div>
                                    </label>

                                    <div>
                                      <label className={styles.label}>
                                        <div className="text-left mt-1 mb-1 pb-1">

                                          Employee Id
                                        </div>
                                        <div className="form-outline mb-4">
                                          <input
                                            type="text"
                                            value={pEid}
                                            onChange={(e) =>
                                              setPEid(e.target.value)
                                            }
                                            className="sinput"
                                          />
                                        </div>
                                      </label></div>


                                      <button
                                      id="button"
                                      onClick={(e) => postProject(e)}
                                      className={styles.subtn1}

                                    >
                                     Add Employee
                                    </button>


                                    <button
                                      id="button"
                                      onClick={(e) => setOpen(false)}
                                      className={styles.subtn}

                                    >
                                      Close
                                    </button>

                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Modal>


                  <div
                    className={"card-body " + styles.cardBody}
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example"
                  >
                    {emp.filter((item) => {
                      if (searchEmployee == "") {
                        return item;
                      } else if ((item.name.toLowerCase().includes(searchEmployee.toLowerCase()))) {
                        return item;

                      }
                    }).map((item, index) => {
                      return (

                        <Accordion >
                          <Accordion.Item eventKey="0" color='#e2d7dd'>

                            <Accordion.Header className={styles.ncrdSetup} >
                              <div className={"col-md-11"}>
                                <div className={"d-flex mx-auto"}>

                                  <div class="form-outline w-100">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#692038" class="bi bi-person-circle" viewBox=" 0 0 16 16">
                                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                      <path fill-rule="#692038" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    <span className={styles.itemName}>
                                      {item?.name}
                                    </span>
                                    {item?.roles?.map((item1, index1) => {
                                      return (
                                        <span className={styles.ptext1}> {item1?.name}</span>
                                      )
                                    })}

                                  </div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="col">
                                <div className="row p-3" key={index}>
                                  <div className="col-md-8 d-flex">

                                  </div>
                                </div>

                                <div className="row p-3" key={index}>

                                  <img src={`http://localhost:8093/api/test/employee/profile-image/${item?.empID}`} className={styles.img12} alt="..." />

                                  <div className={styles.itemName1}>
                                    Employee Id:  <span className={styles.ptext1}> {item?.empID}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Name:  <span className={styles.ptext1}> {item?.name}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Designation:  <span className={styles.ptext1}> {item?.designation}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Role:   {item?.roles?.map((item1, index1) => {
                                      return (
                                        <span className={styles.ptext1}> {item1?.name}</span>
                                      )
                                    })}
                                  </div>
                                  <div className={styles.itemName1}>
                                    Age          :  <span className={styles.ptext1}> {item?.age}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Gender        :  <span className={styles.ptext1}> {item?.gender}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Supervisor    :  <span className={styles.ptext1}> {item?.supervisor}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Email         :  <span className={styles.ptext1}> {item?.email}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Mobile Number :  <span className={styles.ptext1}> {item?.mobileNumber}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    Address       :  <span className={styles.ptext1}> {item?.address}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    City          :  <span className={styles.ptext1}> {item?.city}</span>
                                  </div>
                                  <div className={styles.itemName1}>
                                    State         :  <span className={styles.ptext1}> {item?.state}</span>
                                  </div>

                                </div>


                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                      )
                    })}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;