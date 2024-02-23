import { Box } from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "32938"; // Replace with your actual authentication token
        const response = await axios.get("https://localhost:7149/api/Absence", {
          headers: {
            Auth: `Bearer ${token}`,
          },
        });
        setApiData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Check if apiData is an array before rendering the table
  if (!Array.isArray(apiData)) {
    // Handle the case when apiData is not an array
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <p>Error: Data is not in the expected format.</p>
      </Box>
    );
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ComplexTable
        columnsData={columnsDataComplex}
        tableData={apiData}
      />
    </Box>
  );
}
