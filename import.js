const mysql = require("mysql2");
const xlsx = require("xlsx");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// Set up your MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to import data from Excel to MySQL
const importData = (filePath) => {
  // Read the Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Get the first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON format
  const data = xlsx.utils.sheet_to_json(sheet);

  // Prepare the SQL insert statement
  const sql = `INSERT INTO users (first_name, middle_name, last_name, email, phone, gender, unique_id, jamb_no, current_level, admission_year, program, degree) VALUES ?`;

  // Transform data to match SQL structure
  const values = data.map((row) => [
    row.first_name,
    row.middle_name,
    row.last_name,
    row.email,
    row.phone,
    row.gender,
    row.unique_id,
    row.jamb_no,
    row.current_level,
    row.admission_year,
    row.program,
    row.degree,
  ]);

  // Insert data into MySQL
  connection.query(sql, [values], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
    } else {
      console.log(`Inserted ${results.affectedRows} rows.`);
    }

    // Close the connection
    connection.end();
  });
};

// Specify the path to your Excel file
const filePath = path.join(__dirname, "./Arts.csv"); // Replace with your Excel file path
console.log("File path:", filePath);

// Run the import function
importData(filePath);
