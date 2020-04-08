import React, { useState } from "react"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap"
import { graphql, StaticQuery } from "gatsby"
import { v4 as uuidv4 } from "uuid"

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const [animating, setAnimating] = useState(false)

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  return (
    <StaticQuery
      query={sliderQuery}
      render={data => {
        // setItemData(data.allContentfulSliderImage.edges)
        const next = () => {
          if (animating) return
          const nextIndex =
            activeIndex === data.allContentfulSliderImage.edges.length - 1
              ? 0
              : activeIndex + 1
          setActiveIndex(nextIndex)
        }

        const previous = () => {
          if (animating) return
          const nextIndex =
            activeIndex === 0
              ? data.allContentfulSliderImage.edges - 1
              : activeIndex - 1
          setActiveIndex(nextIndex)
        }
        return (
          <Carousel
            autoPlay={true}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            key={uuidv4()}
          >
            {/* <CarouselIndicators
              items={data.allContentfulSliderImage.edges}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
              key={uuidv4()}
            /> */}

            {data.allContentfulSliderImage.edges.map(({ node }) => (
              <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={`${uuidv4()}${node.id}`}
              >
                <img
                  src={node.image.resize.src}
                  alt={node.name}
                  className="d-block w-100"
                />
              </CarouselItem>
            ))}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        )
      }}
    />
  )
}

export const sliderQuery = graphql`
  query myQuery {
    allContentfulSliderImage {
      edges {
        node {
          name
          image {
            resize(width: 1024, height: 400) {
              src
            }
          }
          id
        }
      }
    }
  }
`

export default ImageSlider
