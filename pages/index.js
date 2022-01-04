import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import Property from '../components/Property'
import { BASE_URL, BASE_URL2, fetchApi, fetchApi2 } from '../utils/fetchApi'

const Banner = ({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  btnText,
  linkName,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br /> {title2}
      </Text>
      <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3">
        {desc1}
        <br /> {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>
          <a>{btnText}</a>
        </Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ pForSale }) {
  console.log(pForSale.listings[0])
  // console.log(propertiesForSale)
  return (
    <Box>
      {/* <Banner
        purpose="RENT A HOME"
        title1="Homes for"
        title2="Rental"
        desc1="Explore Apartments, Houses"
        desc2="and more"
        btnText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex> */}
      {/* ----------------BUY-------------- */}

      {/* <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex> */}
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
    `${BASE_URL}/properties/list-for-sale?state_code=NV&city=Reno&offset=0&limit=6&sort=relevance`
  )

  return {
    props: {
      // propertiesForSale: propertyForSale?.hits,
      pForSale: propertyForSale,
    },
  }
}
