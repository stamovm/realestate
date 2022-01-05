import Link from 'next/link'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import Property from '../components/Property'
import { BASE_URL, fetchApi } from '../utils/fetchApi'
// import Image from 'next/image'

export default function Home({ pForSale }) {
  return (
    <Box pt="4">
      <Flex flexWrap="wrap">
        {pForSale.listings.map((property) => (
          <Property property={property} key={property.property_id} />
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${BASE_URL}/properties/list-for-sale?state_code=NV&city=Reno&offset=0&limit=200&sort=relevance`
  )
  return {
    props: {
      pForSale: propertyForSale,
    },
  }
}
