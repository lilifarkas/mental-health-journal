import React, { useState, useEffect } from 'react';
import "./Garden.css";
import jwt_decode from "jwt-decode"; 

const Garden = () => {
  const [menuModal,setMenuModal] = useState(true);
  const [plantModal,setPlantModal] = useState(false);
  const [treeName,setTreeName] = useState("");
  const [treeType,setTreeType] = useState(1);
  const [trees,setTrees] = useState([]);
  
  const jwtToken = localStorage.getItem("jwtToken");
  const currentUserId = jwt_decode(jwtToken).userID;
  
  const toggleMenuModal = () => {
    setMenuModal(!menuModal);
  };
  
  const togglePlantModal = () => {
    setPlantModal(!plantModal);
    toggleMenuModal();
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

    getTrees().then(result => {
      setTrees(result);
    }).catch(error => {
      console.error(error);
    });
    
  }, []);

  const fetchTree = async (e) => {
    e.preventDefault();

    let tree = {
      name: treeName,
      ownerid:currentUserId,
      type:treeType,
      progress:0
    };

    let response = await fetch('https://localhost:7270/tree', {
      method: 'POST',
      body: JSON.stringify(tree),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    })
    let result = await response.text();
    console.log(result);
  };
  
  
  
  function TreeCard(props) {
    let type = props.type === 1 ? "Oak" : props.type === 2 ? "Spruce" : "Birch";
    let progress = props.progress === 0 ? "Seed" : props.progress === 1 ? "Sprout" : props.progress === 2 ? "Sapling" : "Mature Tree";
    return (
      <div className='tree-card'>
        <h1>{props.name}</h1>
        <h1>{type}</h1>
        <h1>{progress}</h1>
      </div>
    )
  };
  
  const treeCards = trees.map((tree,index) => (
    <TreeCard key={index} name={tree.name} type={tree.type} progress={tree.progress}/>
    ));

    if (!Array.isArray(trees)) {
      return <div>Loading data...</div>;
    }
    
  
    
  return (
    <div className='garden-container'>
      {menuModal && (
        <>
          <h3 className="ratingHeader">Take care of your trees!</h3>
          <div className='plant-card-container'>

            <div onClick={togglePlantModal} className='plant-card'>+</div>

            {treeCards}

          </div>
        </>
      )}
      {plantModal && (
        <form onSubmit={(e) => {fetchTree(e)}} className='plant-tree-modal'>
          <label htmlFor="">Tree name:</label>
          <input onChange={(e) => setTreeName(e.target.value)} type="text" value={treeName} />
          <label htmlFor="">Tree type:</label>
          <select onChange={(e) => setTreeType(Number(e.target.value))} id="tree-type">
            <option value="1">Oak</option>
            <option value="2">Spruce</option>
            <option value="3">Birch</option>
          </select>
          <button type='submit'>Plant!</button>
          <button className='back-btn' onClick={togglePlantModal}>Back</button>
        </form>
      )}
    </div>
  )
}

export default Garden