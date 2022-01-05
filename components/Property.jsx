import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { Tooltip } from '@chakra-ui/react'
// import millify from 'millify'

import DefaultImage from '../assets/images/house.jpeg'

const Property = ({
  property: {
    photo,
    price,
    prop_status,
    beds,
    address,
    baths,
    sqft,
    property_id,
  },
}) => {
  return (
    <Link href={`/property/${property_id}`} passHref>
      <Flex
        flexWrap="wrap"
        w="320px"
        p="2"
        mb="2"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
        _hover={{
          boxShadow: 'dark-lg',
        }}
      >
        <Box mt="2">
          <Image
            src={photo ? photo : DefaultImage}
            width={400}
            height={260}
            alt="house"
          />
        </Box>
        <Box w="full">
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Text fontWeight="bold" fontSize="lg">
                {price}
                {prop_status && `/${prop_status}`}
              </Text>
            </Flex>
            {/* <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box> */}
          </Flex>
          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250px"
            color="teal.500"
          >
            {beds} <FaBed /> | {baths} <FaBath />| {sqft}
            <BsGridFill />
          </Flex>
          <Tooltip label={address}>
            <Text fontSize="lg">
              {address.length > 30 ? `${address.substring(0, 30)}...` : address}
            </Text>
          </Tooltip>
        </Box>
      </Flex>
    </Link>
  )
}

export default Property
