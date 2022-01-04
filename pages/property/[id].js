import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import millify from 'millify'
import { BASE_URL, fetchApi } from '../../utils/fetchApi'
import ImageScroll from '../../components/ImageScroll'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

const PropertyDetails = ({
  pDetails: {
    price,
    building_size,
    beds,
    baths,
    description,
    address, //obj
    heating,
    prop_status,
    prop_type,
    features, //arr amenities
    photos,
  },
}) => (
  // }
  <Box maxWidth="1000px" margin="auto" p="4">
    {/* {console.log('🚀 [id].js ~ line 30 ~  features', features)} */}
    {/* {console.log('🚀 ', address)} */}
    {photos && <ImageScroll data={photos} />}
    <Box w="full" p="6">
      <Flex paddingTop="2" alignItems="center">
        {/* <Box paddingRight="3" color="green.400">
        </Box> */}
        <Text fontWeight="bold" fontSize="lg">
          ${millify(price)} {prop_status && `/${prop_status}`}
        </Text>
        <Spacer />
        {/* <Avatar size="sm" src={broker?.logo?.url}></Avatar> */}
      </Flex>
      <Flex
        alignItems="center"
        p="1"
        justifyContent="space-between"
        w="250px"
        color="blue.400"
      >
        {beds}
        <FaBed /> | {baths} <FaBath /> | {building_size.size}{' '}
        {building_size.units} <BsGridFill />
      </Flex>
    </Box>
    <Box marginTop="2">
      <Text fontSize="lg" marginBottom="2" fontWeight="bold">
        {/* {address} */}
      </Text>
      <Text lineHeight="2" color="gray.600">
        {description}
      </Text>
    </Box>
    <Flex
      flexWrap="wrap"
      textTransform="uppercase"
      justifyContent="space-between"
    >
      <Flex
        justifyContent="space-between"
        w="400px"
        borderBottom="1px"
        borderColor="gray.100"
        p="3"
      >
        <Text>Type</Text>
        <Text fontWeight="bold">{prop_type}</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        w="400px"
        borderBottom="1px"
        borderColor="gray.100"
        p="3"
      >
        <Text>Purpose</Text>
        <Text fontWeight="bold">{prop_status}</Text>
      </Flex>
      {heating && (
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Heating:</Text>
          <Text fontWeight="bold">{heating}</Text>
        </Flex>
      )}
    </Flex>
    <Box>
      {features.length && (
        <Text fontSize="2xl" fontWeight="black" marginTop="5">
          Features:
        </Text>
      )}
      <Flex flexWrap="wrap">
        <Accordion defaultIndex={[0]} allowMultiple>
          {features?.map((item, index) => (
            <AccordionItem key={index}>
              {/* <Text
              key={index}
              fontWeight="bold"
              color="blue.800"
              fontSize="l"
              p="2"
              bg="gray.200"
              m="1"
              borderRadius="5"
            >
              {item.category}
            </Text> */}

              <AccordionButton>
                <Text fontWeight="bold" color="blue.400" fontSize="l">
                  {item.category}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {item?.text?.map((iText, index) => (
                  <Text
                    key={index}
                    // fontWeight="bold"
                    // color="blue.400"
                    // fontSize="m"
                    // p="2"
                    // bg="gray.100"
                    // m="1"
                    // borderRadius="5"
                  >
                    {iText}
                  </Text>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Box>
  </Box>
)

export default PropertyDetails

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(
    `${BASE_URL}properties/v2/detail?property_id=${id}`
  )

  return {
    props: {
      pDetails: data?.properties[0],
    },
  }
}
