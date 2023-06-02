
const fs = require('fs');
const filePath = './data.json';
const express=require('express');
 const app=new express();
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
//read the json file
router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading hospitals data');
      }
      const hospitals = JSON.parse(data);
      res.json(hospitals)
    });
  });
  // Create a new hospital
router.post('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading hospitals data');
      }
  
      const hospitals = JSON.parse(data);
      // const newHospital = {
      //   id: req.body.id,
      //   Hospitalname: req.body.Hospitalname,
      //   PatientCount: req.body.PatientCount,
      //   location: req.body.location,
      // };
  const newHospital=req.body;
      hospitals.push(newHospital);
  
      fs.writeFile(filePath, JSON.stringify(hospitals), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error writing hospitals data');
        }
  
        res.json(hospitals);
      });
    });
  });
// Update location of a hospital
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading hospitals data');
    }

    const hospitals = JSON.parse(data);
    const hospital = hospitals.find((h) => h.id === id);

    if (!hospital) {
      return res.status(404).send('Hospital not found');
    }

    if (req.body.id) {
      hospital.id = req.body.id;
    }
    else if (req.body.Hospitalname) {
      hospital.Hospitalname = req.body.Hospitalname;
    }
    else if (req.body.location) {
      hospital.location = req.body.location;
    }
    else if (req.body.PatientCount) {
      hospital.PatientCount = req.body.PatientCount;
    }

    fs.writeFile(filePath, JSON.stringify(hospitals, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing hospitals data');
      }

      res.json(hospital);
    });
  });
});

  // Delete a hospital
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading hospitals data');
    }

    let hospitals = JSON.parse(data);
    const hospitalIndex = hospitals.findIndex((h) => h.id === id);

    if (hospitalIndex === -1) {
      return res.status(404).send('Hospital not found');
    }

    const deletedHospital = hospitals.splice(hospitalIndex, 1)[0];

    fs.writeFile(filePath, JSON.stringify(hospitals, null, 2), (err) => {
    if (err) {
       console.error(err);
        return res.status(500).send('Error writing hospitals data');
      }

      res.json(deletedHospital);
    });
  });
 });
  
module.exports=router