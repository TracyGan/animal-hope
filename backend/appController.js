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

router.get("/fetch-clienttable", async (req, res) => {
  const tableContent = await appService.fetchClienttable();
  res.json({ data: tableContent });
});

router.get("/fetch-division", async (req, res) => {
  const tableContent = await appService.division();
  res.json({ data: tableContent });
});

router.get("/fetch-group-by-having", async (req, res) => {
  const tableContent = await appService.groupByHaving();
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

router.get("/fetch-feedtable", async (req, res) => {
  const tableContent = await appService.fetchFeedtable();
  res.json({ data: tableContent });
});

router.get("/nested-agg", async (req, res) => {
  const tableContent = await appService.nestedAgg();
  res.json({ data: tableContent });
});

router.get("/calculate-averageDonation", async (req, res) => {
  const tableContent = await appService.calculateAverageDonation();
  res.json({ data: tableContent });
});

router.get("/fetch-donationtable", async (req, res) => {
  const { selection = "DonationDate", order = "DESC", condition } = req.query;
  const tableContent = await appService.fetchDonationtable(
    selection,
    order,
    condition
  );
  res.json({ data: tableContent });
});

router.get("/fetch-featuresFeed", async (req, res) => {
  const { selection, table } = req.query;
  const tableContent = await appService.fetchFeaturesFeed(selection, table);
  res.json({ data: tableContent });
});

router.post("/update-feed", async (req, res) => {
  const { id, feature, value } = req.body;
  const updateResult = await appService.updateFeedtable(id, feature, value);
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
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
  res.json({ data: result });
});

router.get("/get-pet-names", async (req, res) => {
  const result = await appService.getPetNames();
  res.json({ data: result });
});

router.get("/get-paidStaff", async (req, res) => {
  const result = await appService.getPaidStaff();
  res.json({ data: result });
});

router.get("/get-volunteers", async (req, res) => {
  const result = await appService.getVolunteers();
  res.json({ data: result });
});

router.get("/get-walks", async (req, res) => {
  const result = await appService.getWalks();
  res.json({ data: result });
});

router.get("/get-feeds", async (req, res) => {
  const result = await appService.getFeeds();
  res.json({ data: result });
});

router.get("/get-treats", async (req, res) => {
  const result = await appService.getTreats();
  res.json({ data: result });
});

router.get("/get-maxWalkID", async (req, res) => {
  const result = await appService.getMaxWalkID();
  res.json({ data: result });
});

router.post("/insert-walks", async (req, res) => {
  const { id, animalID, volunteerID, duration, dateTime} = req.body;
  const insertResult = await appService.insertWalks(id, animalID, volunteerID, duration, dateTime);
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get("/get-walks-per-volunteer", async (req, res) => {
  const result = await appService.getWalksPerVolunteer();
  res.json({ data: result });
});

module.exports = router;
