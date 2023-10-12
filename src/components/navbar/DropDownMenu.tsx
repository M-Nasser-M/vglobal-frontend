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
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaChevronDown } from "react-icons/fa";

interface MenuData {
  label: string;
  href: string;
}

interface MenuDataProps {
  menuData: MenuData[];
  triggerTitle: string;
}
type Trigger = "click" | "hover";

const DropDownMenu = ({ menuData, triggerTitle }: MenuDataProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const trigger = useBreakpointValue(
    {
      base: "click",
      lg: "hover",
    },
    {
      fallback: "click",
    }
  );
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger={trigger as Trigger}
    >
      <PopoverTrigger>
        <Box cursor="pointer" as="div">
          {triggerTitle}
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
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          mt="2"
          bg="navbar-background"
          px="4"
          width="fit-content"
        >
          <PopoverArrow />
          <PopoverBody>
            <Stack onClick={onClose}>
              {menuData.map((item) => (
                <Link as={NextLink} key={item.label} href={item.href}>
                  <Box as="h6">{item.label}</Box>
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
