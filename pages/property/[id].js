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
    address,
    prop_status,
    prop_type,
    features,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScroll data={photos} />}
    <Box w="full">
      <Flex paddingTop="2" alignItems="center">
        <Text fontWeight="bold" fontSize="lg">
          {price && ` ${millify(price)} `}
          {prop_status && ` /${prop_status}`}
        </Text>
        <Spacer />
      </Flex>
      <Flex
        alignItems="center"
        p="1"
        justifyContent="space-between"
        w="250px"
        color="teal.400"
      >
        {beds}
        <FaBed /> | {baths} <FaBath /> | {building_size.size}{' '}
        {building_size.units} <BsGridFill />
      </Flex>
    </Box>
    <Box marginTop="2">
      <Text fontSize="lg" marginBottom="2" fontWeight="bold">
        {`${address.line}, ${address.city}, ${address.state_code}`}
      </Text>
      <Text lineHeight="2" color="gray.600">
        {description}
      </Text>
    </Box>
    <Flex flexWrap="wrap" textTransform="uppercase">
      <Flex w="180px" borderBottom="1px" borderColor="gray.100" pt="3">
        <Text>Type: </Text>
        <Text fontWeight="bold" pl="2">
          {prop_type}
        </Text>
      </Flex>
      <Flex w="180px" borderBottom="1px" borderColor="gray.100" p="3">
        <Text>Purpose:</Text>
        <Text fontWeight="bold" pl="2">
          {prop_status}
        </Text>
      </Flex>
    </Flex>
    <Box>
      {features.length && (
        <Text fontSize="2xl" marginTop="5">
          Features:
        </Text>
      )}
      <Flex flexWrap="wrap">
        <Accordion allowMultiple>
          {features?.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Text color="teal.500" fontSize="l">
                  {item.category}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {item?.text?.map((iText, index2) => (
                  <Text key={index2}>{iText}</Text>
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
