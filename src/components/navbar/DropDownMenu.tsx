import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
  Stack,
  useDisclosure,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import Link from "@/components/Link";

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

      <PopoverContent mt="2" bg="navbar-background" px="4" width="fit-content">
        <PopoverArrow />
        <PopoverBody>
          <Stack onClick={onClose}>
            {menuData.map((item) => (
              <Link key={item.label} href={item.href}>
                <Box as="h4">{item.label}</Box>
              </Link>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DropDownMenu;
