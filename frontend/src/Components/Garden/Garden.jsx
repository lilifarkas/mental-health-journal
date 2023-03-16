import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import "./Garden.css";

const Garden = () => {
  const [menuModal, setMenuModal] = useState(true);
  const [plantModal, setPlantModal] = useState(false);
  const [treeName, setTreeName] = useState("");
  const [treeType, setTreeType] = useState(1);
  const [trees, setTrees] = useState([]);
  const [user,setUser] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");
  const currentUserId = jwt_decode(jwtToken).userID;

  const toggleMenuModal = () => {
    setMenuModal(!menuModal);
  };

 

  useEffect(() => {
    const getTrees = async () => {
      let response = await fetch(`https://localhost:7270/tree/user${currentUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      let result = await response.json(response)

      let treesArray = [];
      result.$values.forEach(tree => {
        treesArray.push(tree);
      });
      return treesArray;
    };
    const getUser = async () => {
      const response = await fetch(`https://localhost:7270/users/${currentUserId}`, {
        method : 'GET',
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }

      });
        const result = await response.json();
        
        return result;
    }

    getUser().then(result => {
        setUser(result);
    }).catch(error => {
        console.error(error);
    });
    getTrees().then(result => {
      setTrees(result);
    }).catch(error => {
      console.error(error);
    });

  }, []);

  const fetchTree = async (e) => {
    let tree = {
      name: treeName,
      ownerid:currentUserId,
      type:treeType,
      progress:0
    };

    await fetch('https://localhost:7270/tree', {
      method: 'POST',
      body: JSON.stringify(tree),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    })
  };
  
  
  
  function TreeCard(props) {
    let type = props.type === 1 ? "Oak" : props.type === 2 ? "Spruce" : "Birch";
    let progress = props.progress === 0 ? "Seed" : props.progress === 1 ? "Sprout" : props.progress === 2 ? "Sapling" : props.progress === 3 ? "Small Tree" : "Mature Tree";
    
    return (
      <div className='tree-card'>
        <h1>{props.name}</h1>
        <h1>{type}</h1>
        <h1>{progress}</h1>
      </div>
    )
  }

  const treeCards = trees.map((tree, index) => (
    <TreeCard key={index} id={tree.id} name={tree.name} type={tree.type} progress={tree.progress} />
  ));

  if (user == null) {
    return <div>Loading data...</div>;
  }

  const togglePlantModal = () => {
      setPlantModal(!plantModal);
      toggleMenuModal();
  };

  return (
    <div className='garden-container'>
      {menuModal && (
        <>
          <div className="garden-container-title">
            <h3>Grow your tree!</h3>
          </div>
          
          <div className='plant-card-container'>


            <div className="plant-card-image">
              <img src="https://img.freepik.com/premium-vector/planting-tree-spring-semi-flat-color-vector-object-full-sized-item-white-tree-seedling-concern-environment-isolated-modern-cartoon-style-illustration-graphic-design-animation_151150-7017.jpg?w=2000" alt="" height="200px"/>
              <p>Progress: 50/100</p>
            </div>

            {(trees.length === 0 || (user.points - (trees.length * 1000) > 0)) && (
              <div className='plant-card-button-container'>
                <button className='btn btn-success btn-lg' onClick={togglePlantModal}>Plant a new tree</button>
              </div>
            )}
            {((user.points - (trees.length * 1000) < 0)) && (
              <>
                <div className='plant-card-button-container'>
                  <div className='plant-card-button-error'>
                    <p>You can plant new tree when you finished growing the previous</p>
                  </div>
                  <button className='btn btn-success btn-lg' >Plant a new tree</button>
                </div>
              </>
            )}
            </div>
        </>
      )}
      {plantModal && (
        <div className='plant-tree-modal'>
          <div className='plant-tree-back'>
            <button className='btn btn-success btn-lg' onClick={togglePlantModal}>Back</button>
          </div>
          <form onSubmit={(e) => { fetchTree(e) }} className='plant-tree-form'>
            <div className="plant-tree-input-group">
                <div className="input-group mb-3">
                  <span className="input-group-text">Tree name:</span>
                  <input type="text" className="form-control" placeholder="Tree name..." aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setTreeName(e.target.value)} value={treeName}/>
                </div>
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="tree-type">Tree type:</label>
                  <select className="form-select" onChange={(e) => setTreeType(Number(e.target.value))} id="tree-type">
                    <option selected>Choose...</option>
                    <option value="1">Oak</option>
                    <option value="2">Spruce</option>
                    <option value="3">Birch</option>
                  </select>
                </div>
              </div>
                <div className='plant-tree-submit'>
                  <button className='btn btn-success btn-lg' type='submit'>Plant!</button>
                </div>
            
          </form>
        </div>
      )}
    </div>
  )
}

export default Garden