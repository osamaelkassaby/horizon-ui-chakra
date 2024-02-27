import { Box , Text  , Flex} from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from 'components/menu/CoursesMenu'
export default function Settings() {
  const [apiData, setApiData] = useState([]);
  const [courseId , setCourseId] = useState('');
  const [groupId , SetGroupId] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "7EDD40DB-543B-462D-9013-4FE0C85DC9A4"; // Replace with your actual authentication token
        const response = await axios.post("https://localhost:7149/api/Absence", {
          'ID' :groupId}
          ,{
          headers: {
            Auth: `${token}`,
          },
        });
        setApiData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [groupId]);
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
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} display="flex" alignItems="center">
  <Text
    fontSize='22px'
    fontWeight='700'
    lineHeight='100%'
    padding='20px'
    margin='20px'
  >
    Select Course
  </Text>
  <Menu Course={courseId => setCourseId(courseId)} courseID={courseId} />

  
  </Box>
  <Flex pt={{ base: "130px", md: "80px", xl: "80px" }} alignItems="center">
  <Text
    fontSize='22px'
    fontWeight='700'
    lineHeight='100%'
    padding='20px'
    margin='20px'
  >
    Select Week
  </Text>
  <Box ml="auto"> {/* Use ml="auto" to push the Menu to the right */}
    <Menu Course={courseId => setCourseId(courseId)} courseID={courseId} />
  </Box>
</Flex>
 
        <ComplexTable
        columnsData={columnsDataComplex}
        tableData={apiData}
        courseID = {courseId}
        GroupId={groupId => SetGroupId(groupId)}
      />
    </Box>
  );
}
