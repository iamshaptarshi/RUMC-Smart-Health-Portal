const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb://RUMC_SMART_HEALTH_PORTAL:EJmjMcKeS3C0kZRU@ac-bac2ifw-shard-00-00.diblzy3.mongodb.net:27017,ac-bac2ifw-shard-00-01.diblzy3.mongodb.net:27017,ac-bac2ifw-shard-00-02.diblzy3.mongodb.net:27017/?ssl=true&replicaSet=atlas-1lbilp-shard-0&authSource=admin&appName=Cluster0";

const tests = [
  // Pathology
  { name: "Blood Sugar", departmentId: "pat", departmentName: "Pathology" },
  { name: "CBC", departmentId: "pat", departmentName: "Pathology" },
  { name: "CRPBF", departmentId: "pat", departmentName: "Pathology" },
  { name: "Lipid Profile", departmentId: "pat", departmentName: "Pathology" },
  { name: "Thyroid Panel", departmentId: "pat", departmentName: "Pathology" },
  { name: "Urinalysis", departmentId: "pat", departmentName: "Pathology" },
  { name: "S.Bilirubin", departmentId: "pat", departmentName: "Pathology" },
  { name: "Widal Test", departmentId: "pat", departmentName: "Pathology" },
  { name: "Stool R/M/E", departmentId: "pat", departmentName: "Pathology" },

  // Cardiology
  { name: "ECG", departmentId: "cardio", departmentName: "Cardiology" },
  { name: "Chest X-Ray", departmentId: "cardio", departmentName: "Cardiology" },
  { name: "Blood Test", departmentId: "cardio", departmentName: "Cardiology" },

  // Ultrasonography
  {
    name: "4D Pregnancy",
    departmentId: "usno",
    departmentName: "Ultrasonography",
  },
  {
    name: "Anomaly Scan",
    departmentId: "usno",
    departmentName: "Ultrasonography",
  },
  {
    name: "Lower Abdomen",
    departmentId: "usno",
    departmentName: "Ultrasonography",
  },

  // Radiology (X-Ray)
  { name: "X-ray", departmentId: "rad", departmentName: "Radiology" },
  { name: "Dental X-ray", departmentId: "rad", departmentName: "Radiology" },
  {
    name: "Dental X-ray (OPG) Film (10-12)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
  {
    name: "Digital X-ray Film (10-14)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
  {
    name: "Digital X-ray Film (14-17)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
  {
    name: "X-ray Film (10-8)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
  {
    name: "X-ray Film (12-10)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
  {
    name: "X-ray Film (15-12)",
    departmentId: "rad",
    departmentName: "Radiology",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("RUMC_SMART_HEALTH_PORTAL");

  const departments = await db.collection("Tests").find().toArray();

  const formattedTests = tests.map((test) => {
    const dept = departments.find((d) => d.name === test.dept);

    return {
      name: test.name,
      departmentId: test.departmentId.toString(),
      departmentName: test.departmentName,
      createdAt: new Date(),
    };
  });

  await db.collection("tests").insertMany(formattedTests);

  console.log("✅ Tests seeded successfully");
  await client.close();
}

seed();
