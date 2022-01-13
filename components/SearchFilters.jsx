import { useState } from 'react'
import { Flex, Select, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { filterData, getFilterValues } from '../utils/filterData'

export default function SearchFilters() {
  const [filters] = useState(filterData)
  const router = useRouter()

  const searchProperties = (filterValues) => {
    const path = router.pathname
    const { query } = router
    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query })
  }

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters?.map((filter, i) => (
        <Box key={i}>
          <Select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
          >
            {filter?.items?.map((item, i) => (
              <option value={item.value} key={i}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  )
}
