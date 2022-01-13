import Link from 'next/link'
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from '@chakra-ui/react'
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'

const Navbar = () => {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
      <Box
        fontSize="3xl"
        color="teal.400"
        fontWeight="bold"
        _hover={{
          color: 'teal.500',
        }}
      >
        <Link href="/" paddingLeft="2">
          Reno Real Estate
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Flex>
          <Flex display={['none', 'none', 'flex', 'flex']}>
            <Link href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Buy"
                m={0}
                py={0}
                fontSize="xl"
                fontWeight="bold"
                color="teal.600"
                w="100%"
              >
                Buy
              </Button>
            </Link>

            <Link href="/search?purpose=for-sale" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="About"
                m={0}
                py={0}
                fontSize="xl"
                fontWeight="bold"
                color="teal.600"
                w="100%"
              >
                Search
              </Button>
            </Link>

            <Link href="/rent" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                m={0}
                py={0}
                fontSize="xl"
                fontWeight="bold"
                color="teal.600"
                w="100%"
              >
                Rent
              </Button>
            </Link>
          </Flex>
          <Flex display={['flex', 'flex', 'none', 'none']}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FcMenu />}
                variant="outline"
                color="red.400"
              />
              <MenuList>
                <Link href="/" passHref>
                  <MenuItem icon={<FcHome />}>Buy</MenuItem>
                </Link>
                <Link href="/search?purpose=for-sale" passHref>
                  <MenuItem icon={<BsSearch />}>Search</MenuItem>
                </Link>
                <Link href="/rent" passHref>
                  <MenuItem icon={<FcAbout />}>Rent</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Navbar
