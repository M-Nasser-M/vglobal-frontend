import { Link } from "@chakra-ui/next-js";
import {
  Stack,
  Box,
  Popover,
  Text,
  Icon,
  HStack,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

interface MenuData {
  label: string;
  href: string;
}

interface MenuDataProps {
  menuData: MenuData[];
  title: string;
  href: string;
}

const DropDownMenu = ({ menuData, title, href }: MenuDataProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Stack direction="row" spacing={4} display={{ base: "none", sm: "flex" }}>
      <Popover
        trigger="click"
        placement="bottom-start"
        onOpen={onOpen}
        onClose={onClose}
      >
          <HStack alignItems="center" cursor="pointer" role="group">
            <Link
              href={href}
              p={2}
              color={useColorModeValue("gray.600", "gray.200")}
              _groupHover={{
                color: "link-hover",
              }}
              >
              {title}
            </Link>
            <PopoverTrigger>
            <Icon
              as={FaChevronDown}
              h={4}
              w={4}
              _groupHover={{
                color: "link-hover",
              }}
              transition="all .25s ease-in-out"
              transform={isOpen ? "rotate(180deg)" : ""}
            />
        </PopoverTrigger>
          </HStack>

        <PopoverContent
          border={0}
          boxShadow={useColorModeValue(
            "2px 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          bg={useColorModeValue("white", "gray.800")}
          p={4}
          rounded="lg"
          minW="xs"
        >
          <Stack>
            {menuData.map((data, index) => (
              <DropDownItem key={index} {...data} />
            ))}
          </Stack>
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

const DropDownItem = ({ label, href }: MenuData) => {
  return (
    <Link href={href!} display="block" p={2} rounded="md">
      <Stack direction="row" align="center">
        <Box>
          <Text fontWeight={500}>{label}</Text>
        </Box>
      </Stack>
    </Link>
  );
};

export default DropDownMenu;
