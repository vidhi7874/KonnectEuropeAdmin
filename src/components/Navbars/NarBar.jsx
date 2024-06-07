import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();

  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 5, md: 5 }}
      height="24"
      w="100%"
      position="fixed"
      zIndex={220}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderRadius="0 0px 33px 33px "
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-between" }}
      {...rest}
    >
      {/* top header logo img  */}
      <Box width={200} display={{ base: "none", md: "block" }}>
        <Image
          sx={{ mx: "auto" }}
          boxSize="70px"
          objectFit="cover"
          src="/assets/images/logo/light-logo.png"
          alt="logo"
        />
      </Box>
      {/* mobile view menu btn */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* mobile view logo */}
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Box width={200} display={{ base: "flex", md: "none" }}>
          <Image
            sx={{ mx: "auto" }}
            boxSize="70px"
            objectFit="cover"
            src="/assets/images/logo/light-logo.png"
            alt="logo"
          />
        </Box>
      </Text>

      <HStack display={{ base: "flex" }} spacing={{ base: "4", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex justifyContent="space-between" alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight={700} color="#F95700">
                    Demo user
                  </Text>
                  <Text fontSize="xs" color="#B8BFCC">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown fontWeight={700} color="#F95700" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => dispatch(logOut())}>
                Sign out{" "}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
