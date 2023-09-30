import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  PopoverArrow,
  PopoverBody,
  IconButton,
  Stack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaChevronDown } from "react-icons/fa";

interface MenuData {
  label: string;
  href: string;
}

interface MenuDataProps {
  menuData: MenuData[];
}

const DropDownMenu = ({ menuData }: MenuDataProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} trigger="click">
      <PopoverTrigger>
        <IconButton
          bg="navbar-background"
          aria-label="Trigger"
          aria-haspopup="true"
          ml={1}
          size="md"
          icon={<FaChevronDown />}
          transition="all .25s ease-in-out"
          transform={isOpen ? "rotate(180deg)" : ""}
          _hover={{}}
          _active={{}}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg="navbar-background" px={4} width="fit-content">
          <PopoverArrow />
          <PopoverBody>
            <Stack onClick={onClose}>
              {menuData.map((item) => (
                <Link as={NextLink} key={item.label} href={item.href}>
                  <h6>{item.label}</h6>
                </Link>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DropDownMenu;
