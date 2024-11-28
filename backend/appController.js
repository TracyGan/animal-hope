const express = require("express");
const appService = require("./appService");

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get("/check-db-connection", async (req, res) => {
  const isConnect = await appService.testOracleConnection();
  if (isConnect) {
    res.send("connected");
  } else {
    res.send("unable to connect");
  }
});

router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/validate-signin", async (req, res) => {
  const { username, password } = req.body;

  const result = await appService.validateSignIn(username, password);
  if (result) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get("/fetch-animaltable", async (req, res) => {
  const tableContent = await appService.fetchAnimaltable();
  res.json({ data: tableContent });
});

router.get("/fetch-client-names", async (req, res) => {
  const tableContent = await appService.fetchClientNames();
  res.json({ data: tableContent });
});

router.get("/fetch-division", async (req, res) => {
  const tableContent = await appService.division();
  res.json({ data: tableContent });
});

router.delete("/delete-animal", async (req, res) => {
  const id = req.body.animalID;
  const ans = await appService.deleteAnimal(id);
  res.json({result : ans.rowsAffected});
})

router.get("/fetch-foodtable", async (req, res) => {
  const tableContent = await appService.fetchFoodtable();
  res.json({ data: tableContent });
});

router.post("/update-food", async (req, res) => {
  const { price, amount, name, brand } = req.body;
  const updateResult = await appService.updateFoodtable(
    price,
    amount,
    name,
    brand
  );
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/insert-demotable", async (req, res) => {
  const { id, name } = req.body;
  const insertResult = await appService.insertDemotable(id, name);
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/update-name-demotable", async (req, res) => {
  const { oldName, newName } = req.body;
  const updateResult = await appService.updateNameDemotable(oldName, newName);
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get("/count-demotable", async (req, res) => {
  const tableCount = await appService.countDemotable();
  if (tableCount >= 0) {
    res.json({
      success: true,
      count: tableCount,
    });
  } else {
    res.status(500).json({
      success: false,
      count: tableCount,
    });
  }
});

router.post("/get-client-projection", async (req, res) => {
  const { columns } = req.body;
  const result = await appService.getClientProjection(columns);
  // console.log("result: ", result);
  res.json({ data: result });
});

module.exports = router;
