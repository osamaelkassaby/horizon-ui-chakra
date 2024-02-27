import React from "react";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from "react-icons/md";
import axios from "axios";
import { useState , useEffect } from "react";
export default function Banner(props) {
  const { ...rest } = props;
  console.log(props);
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

 
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "7EDD40DB-543B-462D-9013-4FE0C85DC9A4"; // Replace with your actual authentication token
        const response = await axios.post("https://localhost:7149/api/User/Courses/Groups", {
          'ID': props.courseID 
        }, {
          headers: {
            'Auth': token // Pass the token in the headers object
          }
        });
        setApiData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.courseID]);

  console.log(`From Group Menu ${props}`)
  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton
        align='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        onClick={onOpen1}
        borderRadius='10px'
        {...rest}>
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList
        w='150px'
        minW='unset'
        maxW='150px !important'
        border='transparent'
        backdropFilter='blur(63px)'
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='15px'>
      
      {
        apiData.map(item => (
          <MenuItem
          onClick={() => {
            props.GroupeId(item.ID);
            props.CourseName(item.CourseName);
        }}
        
            transition='0.2s linear'
            color={textColor}
            _hover={textHover}
            p='0px'
            borderRadius='8px'
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb='10px'>
            <Flex align='center' >
              <Icon as={MdOutlinePerson} h='16px' w='16px' me='8px' />
              <Text fontSize='sm' fontWeight='400'  >
                {item.Name}
              </Text>
            </Flex>
          </MenuItem>
        ))
      }
     
      </MenuList>
    </Menu>
  );
}
