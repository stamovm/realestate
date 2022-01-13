import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'

import Property from '../components/Property'
import SearchFilters from '../components/SearchFilters'
import { BASE_URL, fetchApi } from '../utils/fetchApi'
import noresult from '../assets/images/noresult.svg'

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false)
  const router = useRouter()

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters(!searchFilters)}
        _hover={{
          color: 'teal.600',
        }}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties{' '}
        {`${router.query.purpose} search results: ${properties.matching_rows}`}
      </Text>
      <Flex flexWrap="wrap">
        {properties.listings.map((property, index) => (
          <Property property={property} key={index} />
        ))}
      </Flex>
      {[properties].length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="no result" />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default Search

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-sale'
  const minPrice = query.minPrice || '500'
  const maxPrice = query.maxPrice || '1000000'
  const bedsMin = query.bedsMin || '1'
  const bathsMin = query.bathsMin || '1'
  const sort = query.sort || 'newest'
  const areaMax = query.areaMax || '5000'
  let data
  if (purpose === 'for-rent') {
    data = await fetchApi(
      `${BASE_URL}/properties/list-for-rent?state_code=NV&city=Reno&offset=0&limit=100&sort=${sort}&baths_min=${bathsMin}&beds_min=${bedsMin}`
    )
  } else {
    data = await fetchApi(
      `${BASE_URL}/properties/list-for-sale?state_code=NV&city=Reno&offset=0&limit=100&sort=${sort}&baths_min=${bathsMin}&beds_min=${bedsMin}&price_min=${minPrice}&price_max=${maxPrice}&sqft_max=${areaMax}`
    )
  }
  return {
    props: {
      properties: data,
    },
  }
}
