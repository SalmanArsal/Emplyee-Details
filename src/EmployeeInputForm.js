import React, { useState } from 'react'

const EmployeeInputForm = () => {
    const [user, setUser] = useState([{
        name: "",
        designation: "",
        type: "",
        contact: "",
        skill: "",
        dob: ""

    }])
    const [record, setRecord] = useState([])
    const [viewData, setViewData] = useState(false)
    const [phone , setPhone] = useState([])
    const [skills , setSkills] = useState([])

    let AddPhone = () => {
        setPhone((prevVal) => {
            console.log(prevVal)
            return [...prevVal , <input type="text"/> ]
        })
    }

    let AddSkill = () => {
        setSkills((prevVal) => {
            console.log(prevVal)
            return [...prevVal , <input type="text"/> ]
        })
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);

        setUser({ ...user, [name]: value })

    }

    const handleAdd = (e) => {
        e.preventDefault();
        const newRecord = { ...user, id: new Date().getTime().toString() }
        console.log(record);
        setRecord([...record, newRecord]);
        console.log(record);
        setUser({ name: "", designation: "", contact: "", skill: "", dob: "" });
    }

    
    //this code was reffered from internet for downloading file
    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(record),
            fileName: 'EmployeeData.json',
            fileType: 'text/json',
        })
    }
    return (
        <div className='container'>
            <form onSubmit={handleAdd}>
                <h1>Employee Data</h1>
                <div className='form'>
                    <label htmlFor='name' >Name :</label>
                    <input type='text'
                        value={user.name}
                        onChange={handleInput}
                        name="name"
                        required/>
                    <br /><br />
                    <label htmlFor='designation'>Designation :</label>
                    <input type='text'
                        value={user.designation}
                        onChange={handleInput}
                        name='designation'
                        required />
                    <br /><br />
                    <label htmlFor='contact'>Contact :</label>
                    <select value={user.type} onChange={handleInput} name='type' >
                        <option selected disabled>Type</option>
                        <option>Emergency</option>
                        <option>primary</option>
                        <option>secondary</option>
                    </select>
                    <input type='tel'
                        value={user.contact}
                        onChange={handleInput}
                        name='contact'
                        placeholder='phone number...' />
                    &nbsp;<button type='button' onClick={AddPhone}>+</button>
                    {phone.map((element) =>{
                        return element
                    })}
                    <br /><br />
                    <label htmlFor='skill'>Skill :</label>
                    <input type='text'
                        value={user.skill}
                        name='skill'
                        onChange={handleInput}
                    />&nbsp;
                    <button type='button' onClick={AddSkill}>+</button>
                    {skills.map((element) =>{
                        return element
                    })}
                    <br /><br />
                    <label htmlFor='dob'>D.O.B :</label>
                    <input type='date'
                        value={user.dob}
                        onChange={handleInput}
                        name='dob'
                        />
                </div>
                <br />
                <div style={{ textAlign: 'center' }}>
                    <button type='submit' onClick={() => setViewData(false)}>Add Employee</button>
                    <br /><br />
                    <button onClick={() => { setViewData(!viewData) }}>view Data</button>
                </div>
            </form>
            <div>
                {viewData ? record.map((curElem, ind) => {
                    const { id, name, designation, type, contact, skill, dob } = curElem;
                    return (
                        <div className="showDataStyle" key={id} >
                            <p>Employee#{ind + 1}</p>
                            <p>Name         :{name}</p>
                            <p>Designation  :{designation}</p>
                            <p>Contact      :{type}-{contact}</p>
                            <p>Skill        :{skill}</p>
                            <p>dob          :{dob}</p>
                        </div>
                    )
                }) : null}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button onClick={exportToJson}>Download JSON</button>
                </div>
            </div>

        </div>

    )
}

export default EmployeeInputForm