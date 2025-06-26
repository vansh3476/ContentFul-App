import { GraphQLClient } from "graphql-request"

/* -------------------------------------------------
 * Helpers to build queries that work even if the
 * `pageCollection` type doesn’t exist in the schema.
 * -------------------------------------------------*/
type PageQueryResult = {
  entryCollection: {
    items: Array<{
      __typename: string
      sys: { id: string }
      slug?: string
      title?: string
      layoutConfig?: any
      heroBlocksCollection?: any
      twoColumnRowsCollection?: any
      imageGridsCollection?: any
    }>
  }
}

const PAGE_CONTENT_TYPE_ID = process.env.CONTENTFUL_PAGE_TYPE_ID || "page"

/**
 * Generic GraphQL query that fetches an entry by slug for a given content-type
 * using `entryCollection` and an inline fragment.  Works even when no
 * `<type>Collection` field exists in the schema.
 */
export const GENERIC_GET_PAGE_QUERY = `
  query GenericGetPage($slug: String!, $ct: String!) {
    entryCollection(
      where: {
        slug: $slug
        sys: { contentType: { eq: $ct } }
      }
      limit: 1
    ) {
      items {
        __typename
        sys { id }
        ... on Page {
          title
          slug
          layoutConfig
          heroBlocksCollection {
            items {
              heading
              cta
              backgroundImage {
                sys { id }
                title
                url
                width
                height
                description
              }
            }
          }
          twoColumnRowsCollection {
            items {
              leftHeading
              leftCta
              rightImage {
                sys { id }
                title
                url
                width
                height
                description
              }
            }
          }
          imageGridsCollection {
            items {
              imagesCollection {
                items {
                  sys { id }
                  title
                  url
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`

/**
 * Fallback query that lists all slugs for a given content-type via
 * `entryCollection`.
 */
export const GENERIC_GET_ALL_PAGES = `
  query GenericGetAllPages($ct: String!) {
    entryCollection(where: { sys: { contentType: { eq: $ct } } }) {
      items {
        ... on Page { slug }
      }
    }
  }
`

// Validate environment variables
const validateEnvVars = () => {
  const requiredVars = ["CONTENTFUL_SPACE_ID", "CONTENTFUL_ACCESS_TOKEN"]
  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`)
    return false
  }
  return true
}

const isValidConfig = validateEnvVars()

const endpoint = isValidConfig
  ? `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
  : "https://graphql.contentful.com/content/v1/spaces/dummy"

export const contentfulClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN || "dummy-token"}`,
  },
})

export const GET_PAGE_QUERY = `
  query GetPage($slug: String!) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfig 
        heroBlocksCollection {
          items {
            heading
            cta
            backgroundImage {
              sys { id }
              title
              url
              width
              height
              description
            }
          }
        }
        twoColumnRowsCollection {
          items {
            leftHeading
            leftCta
            rightImage {
              sys { id }
              title
              url
              width
              height
              description
            }
          }
        }
        imageGridsCollection {
          items {
            imagesCollection {
              items {
                sys { id }
                title
                url
                width
                height
                description
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ALL_PAGES_QUERY = `
  query GetAllPages {
    pageCollection {
      items {
        slug
      }
    }
  }
`

// Helper function to safely make GraphQL requests
export async function safeGraphQLRequest(query: string, variables?: any) {
  try {
    if (!isValidConfig) {
      console.warn("Contentful not configured, returning mock data")
      return getMockData(query, variables)
    }
  console.log(query,variables,"query1111")
    return await contentfulClient.request(query, variables)
  } catch (error) {
    console.error("GraphQL request failed:", error)
    return getMockData(query, variables)
  }
}

// Mock data for development
function getMockData(query: string, variables?: any) {
  if (query.includes("GetPage")) {
    return {
      pageCollection: {
        items: [
          {
            sys: { id: "mock-page" },
            title: `Mock Page ${variables?.slug || ""}`,
            slug: variables?.slug || "mock-page",
            layoutConfig: {
              components: [
                { id: "hero-1", type: "hero", order: 0 },
                { id: "two-column-1", type: "twoColumn", order: 1 },
                { id: "image-grid-1", type: "imageGrid", order: 2 },
              ],
            },
            heroBlocksCollection: {
              items: [
                {
                  heading: "Welcome to Our Platform",
                  subtitle: "Build amazing pages with our drag-and-drop interface",
                  cta: "Get Started",
                  backgroundImage: {
                    sys: { id: "mock-hero-bg" },
                    title: "Hero Background",
                    url: "/placeholder.svg?height=600&width=1200",
                    width: 1200,
                    height: 600,
                    description: "Hero background image",
                  },
                },
              ],
            },
            twoColumnRowsCollection: {
              items: [
                {
                  leftHeading: "Powerful Features",
                  leftSubtitle: "Our platform provides everything you need to create stunning landing pages.",
                  leftCta: "Learn More",
                  rightImage: {
                    sys: { id: "mock-feature-img" },
                    title: "Features Image",
                    url: "/placeholder.svg?height=400&width=600",
                    width: 600,
                    height: 400,
                    description: "Features illustration",
                  },
                },
              ],
            },
            imageGridsCollection: {
              items: [
                {
                  imagesCollection: {
                    items: [
                      {
                        sys: { id: "mock-img-1" },
                        title: "Gallery Image 1",
                        url: "/placeholder.svg?height=400&width=400",
                        width: 400,
                        height: 400,
                        description: "Gallery image 1",
                      },
                      {
                        sys: { id: "mock-img-2" },
                        title: "Gallery Image 2",
                        url: "/placeholder.svg?height=400&width=400",
                        width: 400,
                        height: 400,
                        description: "Gallery image 2",
                      },
                      {
                        sys: { id: "mock-img-3" },
                        title: "Gallery Image 3",
                        url: "/placeholder.svg?height=400&width=400",
                        width: 400,
                        height: 400,
                        description: "Gallery image 3",
                      },
                      {
                        sys: { id: "mock-img-4" },
                        title: "Gallery Image 4",
                        url: "/placeholder.svg?height=400&width=400",
                        width: 400,
                        height: 400,
                        description: "Gallery image 4",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }
  }

  if (query.includes("GetAllPages")) {
    return {
      pageCollection: {
        items: [{ slug: "page-1" }, { slug: "page-2" }],
      },
    }
  }

  return { pageCollection: { items: [] } }
}
