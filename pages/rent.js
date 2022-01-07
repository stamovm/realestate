import { Flex, Box } from '@chakra-ui/react'
import Property from '../components/Property'
import { BASE_URL, fetchApi } from '../utils/fetchApi'

export default function rent({ pForSale: pForRent }) {
  return (
    <Box pt="4">
      <Flex flexWrap="wrap">
        {pForRent.listings.map((property) => (
          <Property property={property} key={property.property_id} />
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForRent = await fetchApi(
    `${BASE_URL}/properties/list-for-rent?state_code=NV&city=Reno&offset=0&limit=200&sort=relevance`
  )
  return {
    props: {
      pForSale: propertyForRent,
    },
  }
}
